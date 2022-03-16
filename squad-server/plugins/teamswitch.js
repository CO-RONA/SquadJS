import BasePlugin from './base-plugin.js';

export default class TeamSwitch extends BasePlugin {
  static get description() {
    return (
      'The <code>TeamSwitch</code>  '
    );
  }

  static get defaultEnabled() {
    return false;
  }

  static get optionsSpecification() {
    return {
      command: {
        required: true,
        description: 'The ID of the channel to log admin broadcasts to.',
        default: '',
        example: '!degis'
      }
    };
  }

  constructor(server, options, connectors) {
    super(server, options, connectors);

    this.onChatMessage = this.onChatMessage.bind(this);
  }

  async mount() {
    this.server.on('CHAT_MESSAGE', this.onChatMessage);
  }

  async unmount() {
    this.server.removeEventListener('CHAT_MESSAGE', this.onChatMessage);
  }

  async onChatMessage(data) {
    if(data.message === "!degis")
    {
        this.server.rcon.switchTeam(data.steamID);
        this.server.rcon.warn(data.steamID, `Auto-Switch | Takım degistirildi!`);
    }
  }
}
