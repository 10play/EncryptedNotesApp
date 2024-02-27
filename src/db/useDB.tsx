import {Database} from '@nozbe/watermelondb';
import {useEffect, useState} from 'react';
import {openDB} from './db';
import {getPassphrase} from '../utils/keychain';

class DBManager {
  private dbCBs: ((db: Database) => void)[] = [];
  public db?: Database;

  constructor() {
    void this.init();
  }

  async init() {
    const passphrase = await getPassphrase();
    this.db = openDB(passphrase);
    this.dbCBs.forEach(cb => cb(this.db!));
  }

  subscribe(cb: (db: Database) => void) {
    this.dbCBs.push(cb);
    return () => {
      this.dbCBs = this.dbCBs.filter(_cb => _cb !== cb);
    };
  }

  getRequiredDB() {
    if (!this.db) {
      throw new Error('DB not initialized');
    }
    return this.db;
  }
}

export const dbManager = new DBManager();

export const useDB = () => {
  const [db, setDB] = useState<Database | undefined>(dbManager.db);

  useEffect(() => {
    return dbManager.subscribe(db => {
      setDB(db);
    });
  }, []);

  return db;
};
