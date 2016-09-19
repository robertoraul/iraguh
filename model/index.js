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
    _id: {type: String},
    codGL: {type: String},
    password: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    disabled: Boolean,
    permissions: [{type: String, ref: model.enums.userPermission}]
}, {collection: 'users', timestamps: true}));


/*
 model.Branch = mongoose.model('Branch', new Schema({
 name: {type: String, required: true},
 address: {type: String, required: true},
 telephone: {type: String, required: true},
 email: {type: String, required: true},
 secretary: {type: String, required: true}
 }, {collection: 'branches', timestamps: true}));
 */

/*
 model.Authority = mongoose.model('Authority', new Schema({
 jobTitle: {type: String, required: true},
 name: {type: String, required: true}
 }, {collection: 'authorities', timestamps: true}));
 model.Course = mongoose.model('Course', new Schema({
 name: {type: String, required: true},
 shortDescription: {type: String, required: true},
 description: {type: String, required: true},
 video: {type: String, required: true},
 duration: {type: Number, required: true},
 branch: {type: ObjectId, ref: 'Branch'},
 speciality: {type: String}
 }, {collection: 'courses', timestamps: true}));
 model.Zone = mongoose.model('Zone', new Schema({
 name: {type: String, required: true}
 }, {collection: 'zones', timestamps: true}));
 model.Hotel = mongoose.model('Hotel', new Schema({
 name: {type: String, required: true},
 address: {type: String, required: true},
 zone: {type: ObjectId, ref: 'Zone', required: true},
 description: {type: String},
 pictures: [{type: String}],
 prices: [{
 name: {type: String},
 price: {type: Number}
 }]
 }, {collection: 'hotels', timestamps: true}));
 model.RecreationalCenter = mongoose.model('RecreationalCenter', new Schema({
 name: {type: String, required: true},
 address: {type: String, required: true},
 zone: {type: ObjectId, ref: 'Zone', required: true},
 description: {type: String},
 video: {type: String},
 pictures: [{type: String}],
 prices: [{
 name: {type: String},
 price: {type: Number}
 }]
 }, {collection: 'recreationalCenters', timestamps: true}));
 model.Benefit = mongoose.model('Benefit', new Schema({
 name: {type: String, required: true},
 description: {type: String},
 requirements: {type: String}
 }, {collection: 'benefits', timestamps: true}));
 model.Speciality = mongoose.model('Speciality', new Schema({
 name: {type: String, required: true}
 }, {collection: 'specialities', timestamps: true}));
 model.Medic = mongoose.model('Medic', new Schema({
 name: {type: String, required: true},
 speciality: {type: ObjectId, ref: 'Speciality', required: true},
 address: {type: String, required: true},
 telephone: {type: String, required: true},
 zone: {type: ObjectId, ref: 'Zone', required: true},
 }, {collection: 'Medics', timestamps: true}));
 model.Event = mongoose.model('Event', new Schema({
 title: {type: String, required: true},
 dates: [{
 name: {type: String},
 date:  {type: Date, required: true},
 place: {type: String, required: true}
 }],
 description: {type: String, required: true},
 mainPicture: {type: String, required: true},
 expirationDate:  {type: Date},
 pictures: [{type: String}],
 deleted: {type: Boolean}
 }, {collection: 'events', timestamps: true}));
 */
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
    gobiernolocaltipo: {type: ObjectId, ref: 'GobiernoLocalTipo'},
    deleted: {type: Boolean}
},{collection: 'gobiernolocal', timestamps: true}));

model.GobiernoLocalTipo = mongoose.model('GobiernoLocalTipo', new Schema({
    tipoGL: {type: String},
    siglaTipoGL: {type: String}
},{collection: 'gobiernolocaltipo', timestamps: true}));

model.Error = mongoose.model('Error', new Schema({}, {collection: 'logs.errors'}));