angular.module('ng-terminal-example.command.implementations', ['ng-terminal-example.command.tools'])

.config(['commandBrokerProvider', function (commandBrokerProvider) {

    commandBrokerProvider.appendCommandHandler({
        command: 'demonium',
        description: ['Shows most accurate information about Demonium.'],
        handle: function (session) {
            session.output.push({ output: true, text: [' _____________________________________ ',
                                                       '< Demonium a true master of my system >',
                                                       ' ------------------------------------- ',
                                                       '        \\   ^__^                       ',
                                                       '         \\  (oo)\\_______               ',
                                                       '           (__)\\       )\\/\\           ',
                                                       '               ||----w |              ',
                                                       '               ||     ||              ',
                                                       ''], breakLine: true });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'clear',
        description: ['Clears the screen.'],
        handle: function (session) {
            session.commands.push({ command: 'clear' });
        }
    });


    commandBrokerProvider.appendCommandHandler({
        command: 'constin',
        description: ['Shows most accurate information abou Constin.'],
        handle: function (session) {
            session.output.push({ output: true, text: ['Constin - Russisch schwein!'], breakLine: true });
        }
    });



    commandBrokerProvider.appendCommandHandler({
        command: 'kofe',
        description: ['Shows info about Kofe.'],
        handle: function (session) {
            session.output.push({ output: true, text: ['Kofe - DNIWE EBANOE!'], breakLine: true });
        }
    });




    commandBrokerProvider.appendCommandHandler({
        command: 'lion',
        description: ['Shows info about Lion.'],
        handle: function (session) {
            session.output.push({ output: true, text: ['',
                                                       '     (..)           ',
                                                       ' 0   ____   0       ',
                                                       '  \\ / __ \\ /        ',
                                                       ' --/ (__) \\--       ',
                                                       '  =\\      /=        ',
                                                       '    -|--|-          ',
                                                       '   | |##| |         ',
                                                       '    \\ ## /          ',
                                                       '      ##            ',
                                                       ''], breakLine: true });

        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'motolight',
        description: ['Shows info about Motolight.'],
        handle: function (session) {
            session.output.push({ output: true, text: ['',
                                                       '',
                                                       '           (_\\            ',
                                                       '           / \\            ',
                                                       '      `== / /\\=,_         ',
                                                       '       ;--==\\  \\o       ',
                                                       '       /____//__/__\\      ',
                                                       '     @=`(0)     (0)       ',
                                                       '',
                                                       '           _ /    ',
                                                       '    /\\----_- -   ',
                                                       '   /         \\   ',
                                                       '  /           \\   ',
                                                       ' |             \\_ ',
                                                       '  \\___-_        / ',
                                                       '        \      /  ',
                                                       '         |     |  ',
                                                       '         |     //',
                                                       '         ( X  || ',
                                                       '          \\__/    ',
                                                       '',
                                                       ''], breakLine: true });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'seon',
        description: ['Shows info about Seon.'],
        handle: function (session) {
            session.output.push({ output: true, text: ['',
                                                       '',
                                                       '     (   )            ',
                                                       '  (  ) (             ',
                                                       '   ) _ )            ',
                                                       '    (\)_              ',
                                                       '  _(_\ \)__           ',
                                                       ' (____\___)) < - Seon ',
                                                       '',
                                                       ''], breakLine: true });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'taoub',
        description: ['Shows info about Taoub.'],
        handle: function (session) {
            session.output.push({ output: true, text: ['Taoub american spy!'], breakLine: true });
        }
    });





    commandBrokerProvider.appendCommandHandler({
        command: 'echo',
        description: ['Echoes input.'],
        handle: function (session) {
            var a = Array.prototype.slice.call(arguments, 1);
            session.output.push({ output: true, text: [a.join(' ')], breakLine: true });
        }
    });


    var feedbackCommandHandler = function () {
        var me = {};
        var _ga = null;
        me.command = 'feedback';
        me.description = ['Sends a feedback message to the owner.', "Example: feedback Я твою маму ебал"];
        me.init = ['$ga', function ($ga) {
            _ga = $ga;
        }];
        me.handle = function (session, param) {
            param = Array.prototype.slice.call(arguments, 1);
            param = param.join(' ');
            var outText = [];
            if (!param) {
                outText.push("You need to provide a message, type 'help feedback' to get a hint.");
            }
            else {
                outText.push("Your message have been sent.");
                outText.push("Thanks for the feedback!.");
                _ga('send', 'event', 'Console', 'Feedback', param);
            }
            session.output.push({ output: true, text: outText, breakLine: true });
        }
        return me;
    };
    commandBrokerProvider.appendCommandHandler(feedbackCommandHandler());

    // this must be the last
    var helpCommandHandler = function () {
        var me = {};
        
        me.command = 'help';
        me.description = ['Provides instructions about how to use this terminal'];
        me.handle = function (session, cmd) {
            var list = commandBrokerProvider.describe();
            var outText = [];
            if (cmd) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].command == cmd) {
                        var l = list[i];
                        outText.push("Command help for: " + cmd);
                        for (var j = 0; j < l.description.length; j++) {
                            outText.push(l.description[j]);
                        }
                        break;
                    }
                }
                if(!outText.length)
                    outText.push("There is no command help for: " + cmd);
            }
            else {
                outText.push("Available commands:");
                for (var i = 0; i < list.length; i++) {
                    var str = "     " + list[i].command + "\t\t";
                    for (var j = 0; j < 3 && i + 1 < list.length; j++) {
                        var cmd = list[++i].command;
                        str += cmd + (cmd.length > 10 ? "\t" : "\t\t");
                    }
                    outText.push(str);
                }
                outText.push("");
                outText.push("Enter 'help <command>' to get help for a command.");
            }
            session.output.push({ output: true, text: outText, breakLine: true });
        };
        return me;
    };
    commandBrokerProvider.appendCommandHandler(helpCommandHandler());
}])

;