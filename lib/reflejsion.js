/**!
 * RefleJSion v0.1
 * https://github.com/lcnvdl/reflejsion
 * Copyright(c) 2013 Luciano Rasente
 * MIT Licensed
 */

/**
 *	Reflection class.
 *
 *	@class Reflection
 *	@static
 */
var Reflection = Reflection || {};

/**
 *	Member scope.
 *
 *	@attribute memberScope
 *	@readOnly
 */
Reflection.memberScope = {
    PRIVATE: 1,
    PUBLIC: 2,
    PROTECTED: 3
};

/**
 *	Member type.
 *
 *	@attribute memberType
 *	@readOnly
 */
Reflection.memberType = {
    METHOD: 1,
    ATTRIBUTE: 2,
    CTOR: 3,
    SPECIAL: 4
};

/**
 *	Gets the type of an object.
 *
 *	@method getType
 *	@static
 *	@param {Object} obj Object.
 *	@return {String} Type name.
 */
Reflection.getType = function(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
};

/**
 *	Gets the members of an object.
 *
 *	@method getMembers
 *	@static
 *	@param {Object} obj Object.
 *	@param {Number} [mTypes] Types.
 *	@param {Number} [mScopes] Scopes.
 *	@return {Array} Members.
 */
Reflection.getMembers = function(obj, mTypes, mScopes) {
    var is = function(a, b) {
        return (typeof a === 'undefined') || (a & b) == b;
    };

    var resul = [];

    for (var mName in obj){
	
		// Scope

        var scope;

        if(mName.indexOf("__") == 0) {
            scope = Reflection.memberScope.PRIVATE;
        }
        else if(mName.indexOf("_") == 0) {
            scope = Reflection.memberScope.PROTECTED;
        }
        else {
            scope = Reflection.memberScope.PUBLIC;
        }

        if(is(mScopes, scope)) {
			// Type
		
            var member = obj[mName];
            var t = Reflection.getType(member);
            var mType;

            var special = (mName.indexOf("$") == 0);
			
			if(special) {
				mType = Reflection.memberType.SPECIAL;
			}
            else if(t == "Function") {
                if(mName == "initialize") {
                    mType = Reflection.memberType.CTOR;
                }
                else {
                    mType = Reflection.memberType.METHOD;
                }
            }
            else {
				mType = Reflection.memberType.ATTRIBUTE;
            }

			// If all is OK, then add to "resul" array
			
            if(is(mTypes, mType)) {
                resul.push(mName);
            }
        }
    }

    return resul;
};

//
//	Node.JS
//

if(typeof module !== 'undefined') {
	module.exports = {
		"Reflection": Reflection
	};
}