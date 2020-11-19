
const endpoint    = process.env['cosmosdb_endpoint']
const key         = process.env['cosmosdb_key']
const databaseId  = process.env['cosmosdb_database']
const containerId = process.env['cosmosdb_linhas']

const CosmosClient = require("@azure/cosmos").CosmosClient;
const client    = new CosmosClient({ endpoint, key });
const database  = client.database(databaseId);
const container = database.container(containerId);


module.exports = async function (context, req) {


    let response = {}

    const querySpec = {
        query: "SELECT l.Linha,l.Operadora,l.Fantasia,l.Situacao,l.Tarifa FROM  l"
    };
    
    const { resources: items } = await container.items
        .query(querySpec)
        .fetchAll();

    if (!items || items.length == 0) {
        response = {
            status: 404,
            body: "Banco de Dados Vazio"
        }
    } else {
        response = {
            status: 200,
            body: { items }
        }
    }

    context.res = response;

}