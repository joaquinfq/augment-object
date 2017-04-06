const getOwnProp = Object.getOwnPropertyNames;
const getProtoOf = Object.getPrototypeOf;
const ObjProto   = Object.prototype;
const isInternal = /^__.*__$/;
//
function getAllPropertyNames(proto, properties)
{
    if (proto)
    {
        for (let _prop of getOwnProp(proto))
        {
            if (!isInternal.test(_prop))
            {
                properties[_prop] = 1;
            }
        }
        getAllPropertyNames(getProtoOf(proto), properties);
    }
}
//
module.exports   = function (proto)
{
    const _properties = {};
    getAllPropertyNames(proto, _properties);
    return Object.keys(_properties).filter(p => proto[p] !== ObjProto[p]).sort();
};
