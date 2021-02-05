const get_server_id = (server, dbClient) => {
    const query = {
        text: 'SELECT id FROM public."Servers" WHERE name=($1)',
        values: [server]
    };
    // callback
    dbClient.query(query, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0]);
            return res.rows[0];
        }
    })
};

module.exports = {
    add_dino(name, server, dbClient) {
        try {
            const server_add_query = {
                text: 'INSERT INTO public."Servers"(name) VALUES($1) ON CONFLICT DO NOTHING',
                values: [server]
            };
            // callback
            dbClient.query(server_add_query, (err, res) => {
                if (err) {
                    console.log(err.stack)
                } else {
                    console.log(res)
                }
            })

            const query = {
                text: 'INSERT INTO public."Dinosaurs"(name, server_id) SELECT ($1), id FROM public."Servers" where name=($2)',
                values: [name, server]
            };

            // callback
            dbClient.query(query, (err, res) => {
                if (err) {
                    console.log(err.stack)
                } else {
                    console.log(res)
                }
            })
        } catch (err) {
            console.log(err);
        }
    },
    remove_dino(name, server, dbClient) {
        try {
            const query = {
                text: 'DELETE FROM public."Dinosaurs" WHERE name=($1) AND server_id=($2)',
                values: [name, get_server_id(server)]
            };

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