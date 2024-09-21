/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const DefaultException = require('../models/exception/DefaultException');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

/**
 * UserRepository
 * @param {*} DbModel 
 * @returns 
 */
const UserRepository = DbModel => {

   /**
    * signin user
    * @param {*} user 
    * @returns 
    */
   const signin = async (user) => {
      try {
         user._id = new ObjectId;
         const newUser = new DbModel(user);
         await newUser.save();
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
      return await DbModel.findOne({email}).select("-__v"); // Retrieve without __id and __v
   } catch (e) {
      const excepcion = new DefaultException(e.message);
      throw excepcion;
   }
  }


   return { signin, login, }

}

module.exports = UserRepository;