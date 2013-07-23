/**
 *	Namespace.
 */
var Reflection = Reflection || {};

Reflection.memberScope = {
    PRIVATE: 1,
    PUBLIC: 2,
    PROTECTED: 3
};

Reflection.memberType = {
    METHOD: 1,
    ATTRIBUTE: 2,
    CTOR: 3,
    SPECIAL: 4
};

Reflection.getType = function(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
};

Reflection.getMembers = function(obj, mTypes, mScopes) {
    var is = function(a, b) {
        return (typeof a === 'undefined') || (a & b) == b;
    };

    var resul = [];

    for (var mName in obj){

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
            var member = obj[mName];
            var t = Reflection.getType(member);
            var mType;

            var special = (mName.indexOf("$") == 0);
            if(t == "Function") {
                if(special) {
                    mType = Reflection.memberType.CTOR;
                }
                else {
                    mType = Reflection.memberType.METHOD;
                }
            }
            else {
                if(special) {
                    mType = Reflection.memberType.SPECIAL;
                }
                else {
                    mType = Reflection.memberType.ATTRIBUTE;
                }
            }

            if(is(mTypes, mType)) {
                resul.push(mName);
            }
        }
    }

    return resul;
};