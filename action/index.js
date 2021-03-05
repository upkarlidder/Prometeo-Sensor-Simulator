const LoremIpsum = require("lorem-ipsum").LoremIpsum;

function main(args) {
    const logger = require('pino')();

    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
            max: 8,
            min: 4
        },
        wordsPerSentence: {
            max: 16,
            min: 4
        }
    });

    const msg = lorem.generateWords(1);
    logger.info(msg);
    return ({ greeting: msg });

}

exports.main = main;