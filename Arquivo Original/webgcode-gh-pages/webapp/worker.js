"use strict";
var $ = {
    each: function (array, func) {
        for (var i = 0; i < array.length; i++)
            func(i, array[i]);
    },
    extend: function () {
        /** stolen from JQUERY **/
        var src, copy, name, options,
            target = arguments[0] || {},
            length = arguments.length;
        for (var i = 0; i < length; i++)
            if ((options = arguments[i]) != null)
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy)
                        continue;
                    if (copy !== undefined)
                        target[name] = copy;
                }
        return target;
        /** END stolen from JQUERY **/
    }
};

importScripts('libs/require.js', 'config.js');
var tasks = {
    simulateGCode: function (event) {
        require(['cnc/gcode/gcodeSimulation'], function (gcodeSimulation) {
            gcodeSimulation.simulateWorkerSide(event);
        });
    },
    ping: function (event) {
        setTimeout(function () {
            postMessage('pong');
        }, 10);
    },
    uiPreparePolylines: function (event) {
        require(['cnc/ui/asyncUI'], function (async) {
            var res = async.preparePolylines(event.data.polylines);
            self.postMessage({id: event.data.id, result: res.result}, res.transferable);
        });
    }
};

self.onmessage = function (event) {
    try {
        tasks[event.data.operation](event);
    } catch (e) {
        console.log('error', e)
        throw e;
    }
};
