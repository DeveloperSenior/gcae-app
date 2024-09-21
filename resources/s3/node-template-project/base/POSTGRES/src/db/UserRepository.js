/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const DefaultException = require('../models/exception/DefaultException');
const format = require('pg-format');

const QUERYS = {
   signin : 'INSERT INTO TUSERS (USERNAME, BIO, AVATAR, EMAIL, PASSWORD, UPDATEDAT, CREATEDAT) VALUES (%L)',
   login : 'SELECT _ID, USERNAME, PASSWORD FROM  TUSERS WHERE EMAIL = %L'
}

/**
 * UserRepository
 * @param {*} pool 
 * @returns 
 */
const UserRepository = pool => {

   /**
    * signin user
    * @param {*} user 
    * @returns 
    */
   const signin = async (user) => {
      try {
         const {
            userName, bio, avatar, email, password,createdAt
         } = user;
         const sql = format(QUERYS.signin, [userName,bio,avatar,email,password,null,createdAt]); 
         await pool.query(sql);
         return true;
      } catch (e) {
         const excepcion = new DefaultException(e.message);
         throw excepcion;
      }
   }

   /**
    * login user
    * @param {*} email 
    * @returns 
    */
  const login = async (email) =>{
   try {
      const sql = format(QUERYS.login, [email]); 
      const result = await pool.query(sql);
      return result.rows[0];
   } catch (e) {
      const excepcion = new DefaultException(e.message);
      throw excepcion;
   }
  }


   return { signin, login, }

}

module.exports = UserRepository;