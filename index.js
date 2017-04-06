/**
 * Asigna a la clase los métodos y propiedades de las demás clases especificadas
 * que pasan el filtro.
 *
 * Por defecto, si una clase ya tiene un método o propiedad no se sobrescribirá.
 * Para cambiar este comportamiento se debe especificar el parámetro `options`
 * con la función a usar en a clave `filter`.
 *
 * Las opciones se pueden especificar en cualquier posición y se pasarán como
 * parámetro `options` a la función `augmentObject`
 *
 * @param {Function}   dstClass Clase a modificar.
 * @param {Function[]} classes  Clases que aportarán sus métodos y propiedades.
 *
 * @return {Function} Clase modificada.
 */
function augmentClass(dstClass, ...classes)
{
    if (typeof dstClass === 'function')
    {
        const _options = {};
        const _classes = [];
        for (let _arg of classes)
        {
            const _type = typeof _arg;
            if (_type === 'function')
            {
                _classes.push(_arg.prototype);
            }
            else if (_arg && _type === 'object')
            {
                Object.assign(_options, _arg);
            }
        }
        augmentObject(_options, dstClass.prototype, ..._classes);
    }
    return dstClass;
}
/**
 * Asigna al objeto los métodos y propiedades de los demás objetos especificados
 * que pasan el filtro.
 * Por defecto, si un objeto ya tiene un método o propiedad no se sobrescribirá.
 *
 * @param {Object}   options Opciones a usar para configurar la modificación.
 * @param {Object}   dst     Objecto a modificar.
 * @param {Object[]} objects Objectos que aportarán sus métodos y propiedades.
 *
 * @return {Function} Objeto modificada.
 */
function augmentObject(options = {}, dst, ...objects)
{
    if (dst)
    {
        if (!options || typeof options !== 'object')
        {
            options = {};
        }
        const _filter = typeof options.filter === 'function'
            ? options.filter
            : (name, dst, src) => src.hasOwnProperty(name) && !dst[name];
        //------------------------------------------------------------------------------
        // Iteramos sobre los objetos que aportan sus métodos y propiedades.
        //------------------------------------------------------------------------------
        objects.forEach(
            src =>
            {
                Object.getOwnPropertyNames(src).forEach(
                    name =>
                    {
                        if (_filter(name, dst, src))
                        {
                            dst[name] = src[name];
                        }
                    }
                )
            }
        );
    }
    //
    return dst;
}
//------------------------------------------------------------------------------
module.exports = {
    augmentClass,
    augmentObject
};
