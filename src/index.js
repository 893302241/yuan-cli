import '@babel/polyfill'
const fs = require('fs');
const program = require('commander');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
import { downloadTem } from './utils/download'

program.version('1.0.0', '-v, --version')
  .command('init <name>')
  .action((name) => {
    if (!fs.existsSync(name)) {
      inquirer.prompt([
        {
          name: 'description',
          message: 'description:'
        },
        {
          name: 'author',
          message: 'author:'
        },
        {
          name: 'version',
          message: 'version:(1.0.0)'
        },
      ]).then((answers) => {
        const spinner = ora('The template is being downloaded...');
        spinner.start();
        downloadTem(name).then(() => {
          spinner.succeed();
          const fileName = `${name}/package.json`;
          if (fs.existsSync(fileName)) {
            const content = fs.readFileSync(fileName).toString();
            let json = JSON.parse(content);
            json.name = name;
            json.author = answers.author;
            json.description = answers.description;
            //修改项目文件夹中 package.json 文件
            fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
          }
          console.log(symbols.success, chalk.green('Done'));
        }).catch(err => {
          spinner.fail();
          console.log(symbols.error, chalk.red(err));
        })
      })
    } else {
      // 错误提示项目已存在，避免覆盖原有项目
      console.log(symbols.error, chalk.red(`${name} is Already Existed`));
    }
  });
program.parse(process.argv);