module.exports = {
    add_dino(name, server, dbClient) {
        console.log(name);
        console.log(server);
        try {
            const server_add_query = {
                text: 'INSERT INTO public."Servers"(name) VALUES($1) ON CONFLICT DO NOTHING',
                values: [message.guild.name]
            };
            console.log(server_add_query);
            console.log(dbClient);
            // callback
            dbClient.query(server_add_query, (err, res) => {
                if (err) {
                    console.log(err.stack)
                } else {
                    console.log(res.rows[0])
                }
            })

            const query = {
                text: 'INSERT INTO public."Dinosaurs"(name, server_id) SELECT ($1), id FROM public."Servers" where name=($2)',
                values: [name, server]
            };
            console.log(query);
            console.log(dbClient);
            // callback
            dbClient.query(query, (err, res) => {
                if (err) {
                    console.log(err.stack)
                } else {
                    console.log(res.rows[0])
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
}