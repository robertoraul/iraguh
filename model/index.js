var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var model = module.exports;

model.enums = {
    userPermission: {
        ADMIN: 'admin',
        DPE: 'dpe',
        ROME: 'rome'
    }
};

model.User = mongoose.model('User', new Schema({
    _id: {type: String},
    dpe: {type: ObjectId, ref: 'Dpe'},
    gobiernolocal: {type: ObjectId, ref: 'GobiernoLocal'},
    password: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    disabled: Boolean,
    permission: {type: String, ref: model.enums.userPermission}
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
    dpe: {type: String},
    gobLocal: {type: String},
    tipoGobLocal: {type: String},
    fechaAltaReg: {type: Date},
    fechaModifReg: {type: Date},
    fechaBajaReg: {type: Date},
    obsFechaAltaReg: {type: String},
    obsFechaModifReg: {type: String},
    obsFechaBajaReg: {type: String},
    activo: {type: Boolean},
    variables: [{type: ObjectId, ref: 'Variable', required: true}],
    deleted: {type: Boolean}
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
    activo: {type: Boolean},
    deleted: {type: Boolean}
}, {collection: 'variables', timestamps: true}));

model.GobiernoLocal = mongoose.model('GobiernoLocal', new Schema({
    codGL : {type: String},
    tipoGL : {type: Number},
    nombreGL : {type: String},
    pob2010 : {type: Number},
    fechaSistema : {type: Date},
    dpe: {type: ObjectId, ref: 'Dpe'},
    gobiernolocaltipo: {type: ObjectId, ref: 'GobiernoLocalTipo'},
    deleted: {type: Boolean}
},{collection: 'gobiernolocal', timestamps: true}));

model.GobiernoLocalTipo = mongoose.model('GobiernoLocalTipo', new Schema({
    tipoGL: {type: Number},
    siglaTipoGL: {type: String}
},{collection: 'gobiernolocaltipo', timestamps: true}));

model.Dpe = mongoose.model('Dpe', new Schema({
    codigo: {type: String, required: true, index: { unique: true }},
    provincia: {type: String, required: true}
},{collection: 'dpes', timestamps: true}));

model.Error = mongoose.model('Error', new Schema({}, {collection: 'logs.errors'}));