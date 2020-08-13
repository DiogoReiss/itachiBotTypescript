import * as Discord from 'discord.js';
import db from '../../database/connection';
interface newUser {
  name: any;
  avatar: string
}


export default class Banco {
  private client: Discord.Client = new Discord.Client()

  command: any
  args: any
  user: newUser
  constructor(msg: any) {
    this.user = {
      name: msg.author.username,
      avatar: msg.author.displayAvatarURL()
    }


    this.args = msg.content.slice(`${process.env.PREFIX}`.length).trim().split(/ +/)
    this.command = this.args.shift().toLowerCase();
  }

  async showBank(msg: any) {
    switch (this.args[0]) {
      case 'saldo': {

        this.showBalance(msg)
        break;
      }
      case 'depositar': {

        break;
      }

      case 'transferir': {

        const accountID = this.args[1]

        break;
      }

      case 'sacar': {

        break;
      }

      default: {

        const wrongCommand = new Discord.MessageEmbed()
          .setColor(0xff0000)
          .setTitle('O pai aqui não tem essa opção')
          .setThumbnail('https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista2.jpeg')
          .addFields(
            { name: 'i.banco saldo', value: 'Magicamente o seu saldo irá aparecer no chat' },
            { name: 'i.banco depositar EM CONSTRUÇÃO', value: 'deposite seu lindo dinheirinho no banco' },
            { name: 'i.banco sacar EM CONSTRUÇÃO', value: 'saque seu lindo dinheirinho do seu banco' },
            { name: 'i.banco transferir EM CONSTRUÇÃO', value: 'mande um dinheiros para aquele seu amigo' }
          )
          .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')


        msg.channel.send(wrongCommand)
        break;
      }
    }
  }

  private async showBalance(msg: any) {
    const balance = await db.select('money')
      .from('users')
      .where('name', this.user.name)
      .andWhere('avatar', this.user.avatar)
      .then(balanceValue => {
        const money: number = balanceValue[0].money
        console.log(money)

        const bankBalance = db.select('money_bank')
          .from('users')
          .where('name', this.user.name)
          .andWhere('avatar', this.user.avatar)
          .then((BankBalance) => {
            const bankMoney: number = BankBalance[0].money_bank;
            console.log(bankMoney)
            console.log(money + bankMoney)

            const bankEmbed = new Discord.MessageEmbed()
              .setColor(0xff0000)
              .setTitle('Banco Uchiha: Feito para você!')
              .setThumbnail('https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista2.jpeg')
              .setDescription('Esse aqui é o seu saldo, bebê s2')
              .addFields(
                { name: ':money_with_wings: Dinheiro na mão', value: `:dollar: R$${money}` },
                { name: ':moneybag: Dindin no banco', value: `:dollar: R$${bankMoney}` }
              )
              .setFooter('Itachi Flamenguista Bot', 'https://raw.githubusercontent.com/DiogoReiss/ItachiBotTypescript/master/public/itachiflamenguista.jpg')

            msg.channel.send(bankEmbed);
          })

      })

  }

  private async depositMoney(msg: any) {

  }

  private async drawOutMoney(msg: any) {

  }

  private async transferMoney(msg: any) {

  }
}
