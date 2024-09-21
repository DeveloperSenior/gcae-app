/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const NodeCache = require('node-cache');
module.exports = new NodeCache({stdTTL: (process.env.CACHE_TTL || 3600)});