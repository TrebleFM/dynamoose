"use strict";

module.exports = (grunt) => {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        mochaTest: {
            test: {
                options: {
                    reporter: "spec"
                },
                src: ["test/**/*.js"]
            },
            testCoverage: {
                options: {
                    reporter: "spec",
                    require: "test/coverage/blanket"
                },
                src: ["test/**/*.js"]
            },
            coverage: {
                options: {
                    reporter: "html-cov",

                    // use the quiet flag to suppress the mocha console output
                    quiet: true,

                    // specify a destination file to capture the mocha
                    // output (the quiet option does not suppress this)
                    captureFile: "coverage.html"
                },
                src: ["test/**/*.js"]
            },
            "travis-cov": {
                options: {
                    reporter: "travis-cov"
                },
                src: ["test/**/*.js"]
            }
        }
    });

    // Load libs
    grunt.loadNpmTasks("grunt-mocha-test");

    // Register the default tasks
    grunt.registerTask("default", ["mochaTest"]);
    grunt.registerTask("test", ["mochaTest:test"]);
    grunt.registerTask("coverage", ["mochaTest:testCoverage", "mochaTest:coverage", "mochaTest:travis-cov"]);
};