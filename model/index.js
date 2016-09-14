var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var model = module.exports;

model.enums = {
    userPermission: {
        ADMIN: 'admin',
        USER_ADMIN: 'user_admin',
        USER: 'user'
    }
};

model.User = mongoose.model('User', new Schema({
// _id is the username
    _id: {type: String},
    password: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    disabled: Boolean,
    permissions: [{type: String, ref: model.enums.userPermission}]
}, {collection: 'users', timestamps: true}));

model.Registro = mongoose.model('Registro', new Schema({
    sector: {type: String, required: true},
    nombreRegistro: {type: String, required: true},
    informatizado: {type: Boolean},
    objetivoRegistro: {type: String},
    nomApellido: {type: String, required: true},
    puestoOrg: {type: String},
    telefono: {type: String},
    email: {type: String},
    obsSector: {type: String},
    obsNomRegistro: {type: String},
    obsInformatizado: {type: String},
    obsObjetivoRegistro: {type: String},
    obsNomApellido: {type: String},
    obsPuestoOrg: {type: String},
    obsTelefono: {type: String},
    obsEmail: {type: String},
    provincia: {type: String, required: true},
    idGL: {type: String},
    gobLocal: {type: String},
    tipoGobLocal: {type: String},
    codGobLocal: {type: String},
    fechaAltaReg: {type: Date},
    fechaModifReg: {type: Date},
    fechaBajaReg: {type: Date},
    obsFechaAltaReg: {type: String},
    obsFechaModifReg: {type: String},
    obsFechaBajaReg: {type: String},
    activo: {type: Boolean},
    variables: [{type: ObjectId, ref: 'Variable', required: true}]
}, {collection: 'registros', timestamps: true}));

model.Variable = mongoose.model('Variable', new Schema({
    nombreRegistro: {type: String},
    apartado: {type: String, required: true},
    variableNro: {type: Number},
    nombreVariable: {type: String, required: true},
    fechaAltaVariable: {type: Date},
    fechaModificacionVariable: {type: Date},
    fechaBajaVariable: {type: Date},
    especifica: {type: Boolean},
    detalle: {type: String},
    unidadMedida: {type: String},
    activo: {type: Boolean}
}, {collection: 'variables', timestamps: true}));
model.Error = mongoose.model('Error', new Schema({}, {collection: 'logs.errors'}));
