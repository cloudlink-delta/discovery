// Name: CLΔ Discovery
// ID: cldeltadiscovery
// Description: Plugin for CLΔ Core to find, connect to, and verify the identity of peers.
// By: MikeDEV <https://scratch.mit.edu/users/MikeDEVTheDucklord/>
// License: MIT

/*
	CloudLink Delta Discovery Plugin

	MIT License

	Copyright (C) 2025 CloudLink Delta.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

;(function (Scratch) {
  'use strict'
  const blockIcon =
    'data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%22312%22%20height%3D%22218%22%20viewBox%3D%220%200%20312%20218%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M155.88%200C194.829%200.000212318%20226.786%2030.1084%20229.987%2068.4414H237.391C278.466%2068.4414%20311.759%20101.922%20311.759%20143.221C311.759%20184.52%20278.466%20218%20237.391%20218H74.3682C33.2934%20218%200%20184.52%200%20143.221C0.000123011%20101.922%2033.2935%2068.4415%2074.3682%2068.4414H81.7715C84.9733%2030.1082%20116.931%200%20155.88%200ZM155.88%2010C122.221%2010%2094.5136%2036.0335%2091.7373%2069.2744L90.9717%2078.4414H74.3682C38.8684%2078.4415%2010.0001%20107.392%2010%20143.221C10%20179.049%2038.8683%20208%2074.3682%20208H237.391C272.891%20208%20301.759%20179.049%20301.759%20143.221C301.759%20107.392%20272.891%2078.4414%20237.391%2078.4414H220.788L220.023%2069.2744C217.246%2036.0337%20189.539%2010.0002%20155.88%2010Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M109.5%20180V172.5L149.85%2072.4502H162L202.2%20172.5V180H109.5ZM124.95%20167.85H186.6L161.55%20102.45C161.25%20101.65%20160.7%20100.2%20159.9%2098.1002C159.1%2096.0002%20158.3%2093.8502%20157.5%2091.6502C156.8%2089.3502%20156.25%2087.6002%20155.85%2086.4002C155.35%2088.4002%20154.75%2090.4502%20154.05%2092.5502C153.45%2094.5502%20152.8%2096.4002%20152.1%2098.1002C151.5%2099.8002%20151%20101.25%20150.6%20102.45L124.95%20167.85Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E'

  const menuIcon =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzczIiBoZWlnaHQ9IjM3MyIgdmlld0JveD0iMCAwIDM3MyAzNzMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjE4Ni41IiBjeT0iMTg2LjUiIHI9IjE4Ni41IiBmaWxsPSIjMEY3RUJEIi8+CjxwYXRoIGQ9Ik0xODYuODggNjFDMjI1LjgyOSA2MS4wMDAyIDI1Ny43ODYgOTEuMTA4NCAyNjAuOTg3IDEyOS40NDFIMjY4LjM5MUMzMDkuNDY2IDEyOS40NDEgMzQyLjc1OSAxNjIuOTIyIDM0Mi43NTkgMjA0LjIyMUMzNDIuNzU5IDI0NS41MiAzMDkuNDY2IDI3OSAyNjguMzkxIDI3OUgxMDUuMzY4QzY0LjI5MzQgMjc5IDMxIDI0NS41MiAzMSAyMDQuMjIxQzMxLjAwMDEgMTYyLjkyMiA2NC4yOTM1IDEyOS40NDIgMTA1LjM2OCAxMjkuNDQxSDExMi43NzJDMTE1Ljk3MyA5MS4xMDgyIDE0Ny45MzEgNjEgMTg2Ljg4IDYxWk0xODYuODggNzFDMTUzLjIyMSA3MSAxMjUuNTE0IDk3LjAzMzUgMTIyLjczNyAxMzAuMjc0TDEyMS45NzIgMTM5LjQ0MUgxMDUuMzY4QzY5Ljg2ODQgMTM5LjQ0MiA0MS4wMDAxIDE2OC4zOTIgNDEgMjA0LjIyMUM0MSAyNDAuMDQ5IDY5Ljg2ODMgMjY5IDEwNS4zNjggMjY5SDI2OC4zOTFDMzAzLjg5MSAyNjkgMzMyLjc1OSAyNDAuMDQ5IDMzMi43NTkgMjA0LjIyMUMzMzIuNzU5IDE2OC4zOTIgMzAzLjg5MSAxMzkuNDQxIDI2OC4zOTEgMTM5LjQ0MUgyNTEuNzg4TDI1MS4wMjMgMTMwLjI3NEMyNDguMjQ2IDk3LjAzMzcgMjIwLjUzOSA3MS4wMDAyIDE4Ni44OCA3MVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNDAuNSAyNDFWMjMzLjVMMTgwLjg1IDEzMy40NUgxOTNMMjMzLjIgMjMzLjVWMjQxSDE0MC41Wk0xNTUuOTUgMjI4Ljg1SDIxNy42TDE5Mi41NSAxNjMuNDVDMTkyLjI1IDE2Mi42NSAxOTEuNyAxNjEuMiAxOTAuOSAxNTkuMUMxOTAuMSAxNTcgMTg5LjMgMTU0Ljg1IDE4OC41IDE1Mi42NUMxODcuOCAxNTAuMzUgMTg3LjI1IDE0OC42IDE4Ni44NSAxNDcuNEMxODYuMzUgMTQ5LjQgMTg1Ljc1IDE1MS40NSAxODUuMDUgMTUzLjU1QzE4NC40NSAxNTUuNTUgMTgzLjggMTU3LjQgMTgzLjEgMTU5LjFDMTgyLjUgMTYwLjggMTgyIDE2Mi4yNSAxODEuNiAxNjMuNDVMMTU1Ljk1IDIyOC44NVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo='

  // Require the plugin to be unsandboxed
  if (!Scratch.extensions.unsandboxed) {
    alert(
      'The CloudLink Delta Discovery plugin must be loaded in an unsandboxed environment.'
    )
    return
  }

  // Require access to the VM and/or runtime
  if (!Scratch.vm || !Scratch.vm.runtime) {
    alert(
      "The CloudLink Delta Discovery plugin could not detect access to the Scratch VM and/or runtime; this plugin won't work."
    )
    return
  }

  // Require browser to support Web Locks API (used for concurrency)
  if (!navigator.locks) {
    alert(
      "The CloudLink Delta Discovery plugin could not detect Web Locks support; this plugin won't work."
    )
    return
  }

  // Initialize the plugin loader
  if (!Scratch.vm.runtime.ext_cldelta_pluginloader) {
    Scratch.vm.runtime.ext_cldelta_pluginloader = new Array()
  }

  /*
		Block utilities for creating blocks with less code.
		Based on Rotur.js by Mistium
		https://extensions.mistium.com/featured/Rotur.js

		MPL-2.0
		This Source Code is subject to the terms of the Mozilla Public License, v2.0,
		If a copy of the MPL was not distributed with this file,
		Then you can obtain one at https://mozilla.org/MPL/2.0/
	*/
  // Defines a set of block types
  const opcodes = {
    conditional: (opcode, text, options = {}) => ({
      opcode,
      text: text.map(v => Scratch.translate(v)),
      blockType: Scratch.BlockType.CONDITIONAL,
      branchCount: text.length - 1,
      ...options
    }),

    reporter: (opcode, text, args = {}, options = {}) => ({
      opcode,
      blockType: Scratch.BlockType.REPORTER,
      text: Scratch.translate(text),
      arguments: args,
      ...options
    }),

    command: (opcode, text, args = {}, options = {}) => ({
      opcode,
      blockType: Scratch.BlockType.COMMAND,
      text: Scratch.translate(text),
      arguments: args,
      ...options
    }),

    boolean: (opcode, text, args = {}, options = {}) => ({
      opcode,
      blockType: Scratch.BlockType.BOOLEAN,
      text: Scratch.translate(text),
      arguments: args,
      ...options
    }),

    event: (opcode, text, options = {}) => ({
      opcode,
      blockType: Scratch.BlockType.EVENT,
      text: Scratch.translate(text),
      isEdgeActivated: false,
      ...options
    }),

    button: (text, func, options = {}) => ({
      blockType: Scratch.BlockType.BUTTON,
      text: Scratch.translate(text),
      func,
      ...options
    }),

    label: text => ({
      blockType: Scratch.BlockType.LABEL,
      text: Scratch.translate(text)
    }),

    separator: () => '---'
  }

  const args = {
    string: (value, options = {}) => ({
      type: Scratch.ArgumentType.STRING,
      defaultValue: value,
      ...options
    }),

    number: (value, options = {}) => ({
      type: Scratch.ArgumentType.NUMBER,
      defaultValue: value,
      ...options
    }),

    boolean: (value, options = {}) => ({
      type: Scratch.ArgumentType.BOOLEAN,
      defaultValue: value,
      ...options
    })
  }

  class CloudLinkDelta_Discovery {
    constructor () {
      this.core
    }

    /**
     * Called when the plugin is registered with the core extension.
     *
     * @param {Object} core - The core object of the CLΔ framework.
     */
    register (core) {
      // Implement any additional hooks
      this.core = core

      if (!core.plugins.includes('discovery')) {
        core.plugins.push('discovery')
        console.log('CLΔ Discovery plugin registered.')
      }
    }

    getInfo () {
      return {
        id: 'cldeltadiscovery',
        name: 'CLΔ Discovery',
        menuIconURI: menuIcon,
        blockIconURI: blockIcon,
        color1: '#0F7EBD',
        blocks: [
          // Config
          opcodes.label('Config'),
          opcodes.command(
            'setDesignation',
            'use designation [DESIGNATION] for discovery',
            {
              DESIGNATION: args.string('US-NKY-1')
            }
          ),
          opcodes.command(
            'setLobbyListOutput',
            'store the lobby list in [LIST]',
            {
              LIST: args.string('my list')
            }
          ),
          opcodes.boolean(
            'isDiscoveryServicesEnabled',
            'are discovery services enabled?'
          ),
          opcodes.command(
            'toggleDiscoveryServices',
            '[ENABLER] discovery services',
            {
              ENABLER: args.string('enable', { menu: 'enabler' })
            }
          ),
          opcodes.separator(),

          // Status
          opcodes.label('Status'),
          opcodes.reporter('myInstanceID', 'my instance id'),
          opcodes.reporter('currentLobby', 'current lobby'),
          opcodes.boolean('isInLobby', 'am I in a lobby?'),
          opcodes.boolean('isLobbyState', 'am I a lobby [STATE]?', {
            STATE: args.string('host?', { menu: 'lobbystate' })
          }),
          opcodes.separator(),

          // Peer resolver
          opcodes.label('Peer resolver'),
          opcodes.command('resolvePeer', 'resolve peer [PEER]', {
            PEER: args.string('B')
          }),
          opcodes.reporter('resolvedPeerInfo', 'resolved peer [PEER] [INFO]', {
            PEER: args.string('B'),
            INFO: args.string('online?', { menu: 'peerinfo' })
          }),
          opcodes.separator(),

          // Lobby resolver
          opcodes.label('Lobby resolver'),
          opcodes.command('refreshLobbyList', 'refresh lobby list'),
          opcodes.command('resolveLobby', 'resolve lobby [LOBBY]', {
            LOBBY: args.string('DemoLobby')
          }),
          opcodes.reporter(
            'resolvedLobbyInfo',
            'resolved lobby [LOBBY] [INFO]',
            {
              LOBBY: args.string('DemoLobby'),
              INFO: args.string('current host', { menu: 'lobbyinfo' })
            }
          ),
          opcodes.separator(),

          // Lobby membership
          opcodes.label('Lobby membership'),
          opcodes.command(
            'hostLobby',
            'host a lobby named [LOBBY] with player limit: [PEERS] password: [PASSWORD] locked: [LOCK] hidden: [HIDDEN] metadata: [METADATA]',
            {
              LOBBY: args.string('DemoLobby'),
              PEERS: args.number('-1'),
              PASSWORD: args.string('change me'),
              LOCK: args.boolean(false),
              HIDDEN: args.boolean(false),
              METADATA: args.string('...')
            }
          ),
          opcodes.command('closeLobby', 'close lobby'),
          opcodes.command(
            'joinLobby',
            'join lobby [LOBBY] with password: [PASSWORD]',
            {
              LOBBY: args.string('DemoLobby'),
              PASSWORD: args.string('change me')
            }
          ),
          opcodes.command('leaveLobby', 'leave lobby'),

          opcodes.separator(),

          // Lobby admin
          opcodes.label('Lobby admin'),
          opcodes.command('updateLockFlag', '[LOCK] access to the lobby', {
            LOCK: args.string('lock', { menu: 'lockflag' })
          }),
          opcodes.command('updateHiddenFlag', '[VISIBILITY] the lobby', {
            VISIBILITY: args.string('show', { menu: 'visibilityflag' })
          }),
          opcodes.command(
            'updatePlayerLimit',
            'update player limit to [LIMIT]',
            {
              LIMIT: args.number(-1)
            }
          ),
          opcodes.command(
            'updateLobbyPassword',
            'update lobby password to [PASSWORD]',
            {
              PASSWORD: args.string('change me')
            }
          ),
          opcodes.command('kickFromLobby', 'kick [PEER] from the lobby', {
            PEER: args.string('B')
          }),
          opcodes.command(
            'transferLobby',
            'transfer ownership of the lobby to [PEER]',
            {
              PEER: args.string('B')
            }
          )
        ],
        menus: {
          enabler: {
            items: [Scratch.translate('enable'), Scratch.translate('disable')]
          },
          lobbystate: {
            items: [Scratch.translate('host'), Scratch.translate('peer')]
          },
          lockflag: {
            items: [Scratch.translate('lock'), Scratch.translate('unlock')]
          },
          visibilityflag: {
            items: [Scratch.translate('show'), Scratch.translate('hide')]
          },
          lobbyinfo: {
            items: [
              Scratch.translate('current host'),
              Scratch.translate('current player limit'),
              Scratch.translate('current player count'),
              Scratch.translate('metadata'),
              Scratch.translate('hidden?'),
              Scratch.translate('password required?')
            ]
          },
          peerinfo: {
            items: [
              Scratch.translate('online?'),
              Scratch.translate('round-trip time from discovery server (ms)'),
              Scratch.translate('hosting a lobby?'),
              Scratch.translate('member of a lobby?'),
              Scratch.translate('current lobby'),
              Scratch.translate('designation'),
              Scratch.translate('instance id')
            ]
          }
        }
      }
    }

    myInstanceID () {
      if (!this.core) return
      return ''
    }

    setDesignation ({ DESIGNATION }) {
      if (!this.core) return
    }

    toggleDiscoveryServices ({ ENABLER }) {
      if (!this.core) return
    }

    isDiscoveryServicesEnabled () {
      if (!this.core) return false
      return false
    }

    resolvedPeerInfo ({ PEER, INFO }) {
      if (!this.core) return
    }

    resolvePeer ({ PEER }) {
      if (!this.core) return
    }

    isLobbyHost () {
      if (!this.core) return false
      return false
    }

    hostLobby ({ LOBBY, PEERS, PASSWORD, LOCK, HIDDEN, METADATA }) {
      if (!this.core) return
    }

    updateLockFlag ({ LOCK }) {
      if (!this.core) return
    }

    updateHiddenFlag({ VISIBILITY }) {
      if (!this.core) return
    }

    updatePlayerLimit ({ LIMIT }) {
      if (!this.core) return
    }

    updateLobbyPassword ({ PASSWORD }) {
      if (!this.core) return
    }

    kickFromLobby ({ PEER }) {
      if (!this.core) return
    }

    transferLobby ({ PEER }) {
      if (!this.core) return
    }

    closeLobby () {
      if (!this.core) return
    }

    leaveLobby () {
      if (!this.core) return
    }

    currentLobby () {
      if (!this.core) return
      return ''
    }

    isInLobby () {
      if (!this.core) return
      return false
    }

    isLobbyState ({ STATE }) {
      if (!this.core) return
      return false
    }

    refreshLobbyList () {
      if (!this.core) return
    }

    resolvedLobbyInfo ({ LOBBY, INFO }) {
      if (!this.core) return
      return ''
    }

    resolveLobby ({ LOBBY }) {
      if (!this.core) return
    }

    joinLobby ({ LOBBY, PASSWORD }) {
      if (!this.core) return
    }
  }

  // Register the plugin
  const discovery = new CloudLinkDelta_Discovery()
  Scratch.extensions.register(discovery)
  Scratch.vm.runtime.ext_cldelta_discovery = discovery
  console.log('CLΔ Discovery plugin loaded.')

  // Either immediately register, or defer
  const core = Scratch.vm.runtime.ext_cldelta_core
  if (core) {
    discovery.register(core)
  } else {
    Scratch.vm.runtime.ext_cldelta_pluginloader.push(discovery)
  }
})(Scratch)
