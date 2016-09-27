var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport(global.app.config.email);

module.exports.send = (user, password, domain) => transporter.sendMail({
    from: 'IRA',
    to: user.email,
    subject: '[IRA] Envio de Contraseña',
    html: `Hola ${user.name},<br/><br/>Le enviamos su usuario para ingresar al <a href="${domain}">Inventario de Registros Administrativos</a>.<br/>Usuario: <strong>${user._id}</strong><br/>Password: <strong>${password}</strong><br/><br/>IRA<br/><small>Por favor no responda este mail, esta es una casilla automática.</small>`
});
