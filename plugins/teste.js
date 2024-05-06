// testes

const handler = async (m, { conn, args, usedPrefix, command }) => {


const data = global.db.data.users[m.sender]
console.log(conn)


};
handler.command = /^(test)$/i;
export default handler;



