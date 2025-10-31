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

    hat: (opcode, text, options = {}) => ({
      opcode,
      blockType: Scratch.BlockType.HAT,
      text: Scratch.translate(text),
      isEdgeActivated: false,
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

  function getTarget (target_id, name, type = '') {
    const target = vm.runtime.getTargetById(target_id)
    if (!target) return undefined
    const variable = Object.values(target.variables).find(
      v => v.name === name && v.type === type
    )
    return variable
  }

  class CloudLinkDelta_Discovery {
    constructor () {
      this.id = 'discovery' // used for registerPlugin in core
      this.requiredFeature = 'discovery'
      this.core
      this.discoveryServerID = null // The Peer ID of the server (e.g., "discovery@US-NKY-1")
      this.lobbyListTarget = null // The Scratch list object for output
      this.instanceId = ''
      this.preferredID = ''
      this.currentLobby = null // Will store { lobby_id, host, ... }
      this.amIHost = false
      this.amIPeer = false
      this.lobbyListCache = [] // For the LOBBY_LIST response
      this.resolvedLobbyInfoCache = new Map() // For LOBBY_INFO responses
      this.resolvedPeerCache = new Map() // For QUERY_ACK responses

      /**
       * @type {boolean}
       * Whether the user *wants* discovery to be active.
       */
      this.isEnabled = false
    }

    // Called by Core during registration
    getOpcodes () {
      const handlers = new Map()
      
      // --- Server Responses ---
      handlers.set('CONFIG_REQUIRED', this._handleConfigRequired)
      handlers.set('CONFIG_PEER_ACK', this._handlePeerAck)
      handlers.set('CONFIG_HOST_ACK', this._handleHostAck)
      handlers.set('LOBBY_LIST', this._handleLobbyList)
      handlers.set('LOBBY_INFO', this._handleLobbyInfo)
      handlers.set('QUERY_ACK', this._handleQueryAck)
      handlers.set('REGISTER_ACK', this._handleRegisterAck)
      handlers.set('CLOSE_ACK', this._handleCloseAck)
      handlers.set('LOBBY_CLOSED', this._handleCloseAck)
      handlers.set('TRANSITION', this._handleTransition)
      handlers.set('LOBBY_EXISTS', this._handleLobbyExists)
      handlers.set('PEER_LEFT', this._handlePeerLeft)
      handlers.set('PEER_JOIN', this._handlePeerJoin)

      // --- Stubbed Handlers ---
      const stub = () => { console.log('[CLΔ Discovery]  Stub handler called.') }
      
      
      handlers.set('NEW_LOBBY', stub)
      handlers.set('LOBBY_NOTFOUND', stub)
     
      handlers.set('PASSWORD_REQUIRED', stub)
      handlers.set('PASSWORD_FAIL', stub)
      handlers.set('PASSWORD_ACK', stub)
      handlers.set('REGISTER_FAIL', stub) // Added this
      handlers.set('QUERY_FAIL', stub) // Added this

      return handlers
    }

    /**
     * Called when the plugin is registered with the core extension.
     *
     * @param {Object} core - The core object of the CLΔ framework.
     */
    register (core) {
      const self = this;
      self.core = core
      
      core.registerPlugin(this)

      // --- Bind to the Core's internal JS events ---
      self.core.callbacks.bind('peer_open', self.onCorePeerOpen.bind(self))
      self.core.callbacks.bind('peer_negotiated', self.onPeerConnect.bind(self))
      self.core.callbacks.bind('peer_disconnect', self.onPeerDisconnect.bind(self))

      if (!core.plugins.includes('discovery')) {
        core.plugins.push('discovery')
        console.log('CLΔ Discovery plugin registered.')
      }
    }

    onCorePeerOpen (id) {
      const self = this
      self.instanceId = id // This is our UUID
      if (self.isEnabled && self.discoveryServerID) {
        self.connectToDiscoveryServer()
      }
    }

    onPeerConnect (conn) {
      const self = this
      if (conn.peer === this.discoveryServerID) {
        console.log(`[CLΔ Discovery] Connection to server ${self.discoveryServerID} open.`)
        if (self.preferredID) {
          self.registerPreferredID()
        }
      }
    }

    onPeerDisconnect (conn) {
      const self = this
      if (conn.peer === this.discoveryServerID) {
        console.log(`[CLΔ Discovery] Connection to server ${self.discoveryServerID} was closed or lost.`)
        self.toggleDiscoveryServices({ ENABLER: 'disable' })
      }
    }
    
    /**
     * Helper function to connect to the discovery server.
     * @private
     */
    connectToDiscoveryServer () {
      const self = this;
      if (!self.core || !self.discoveryServerID || !self.core.isPeerConnected()) {
        return // Conditions not met
      }
      
      if (self.core.isOtherPeerConnected({ ID: self.discoveryServerID })) {
        // Already connected. Do nothing.
        // onPeerConnect will have already fired.
      } else {
        // Not connected, start the connection
        console.log(`[CLΔ Discovery] Attempting to connect to server: ${self.discoveryServerID}`)
        self.core.connectToPeer({ ID: self.discoveryServerID })
      }
    }

    registerPreferredID () {
      const self = this;
      console.log(`[CLΔ Discovery] Registering preferred ID "${self.preferredID}"...`)
      self.core._send({
        opcode: 'REGISTER', // Stubbed command
        payload: self.preferredID,
        target: self.discoveryServerID
      })
    }

    // --- Opcode Handlers ---
    
    _handleLobbyList (packet, _) {
      const self = this
      const { payload } = packet
      console.log(`[CLΔ Discovery] Received lobby list with ${payload.length} lobbies.`)
      self.lobbyListCache = payload
      
      if (self.lobbyListTarget) {
        self.lobbyListTarget.value = self.lobbyListCache
      }
    }

    _handleLobbyInfo (packet, _) {
      const self = this
      const { payload } = packet
      self.resolvedLobbyInfoCache.set(payload.lobby_id, payload)
      Scratch.vm.runtime.startHats(`cldeltadiscovery_whenLobbyResolveFinishes`)
    }

    _handleQueryAck (packet, _) {
      const self = this
      const username = packet.payload.username
      self.resolvedPeerCache.set(username, packet.payload)
      Scratch.vm.runtime.startHats(`cldeltadiscovery_whenPeerResolveFinishes`)
    }

    _handleCloseAck(packet, _) {
      const self = this
      console.log(`[CLΔ Discovery] Lobby closed: ${packet.payload}`)
      if (self.currentLobby.lobby_id === packet.payload) {
        self.currentLobby = null
        self.amIHost = false
        self.amIPeer = false
      }
    }

    _handleTransition(packet, _) {
      const self = this
      // Set the current mode to '' (none), 'host', or 'peer'
      self.amIHost = packet.payload === 'host'
      self.amIPeer = packet.payload === 'peer'
    }

    _handleLobbyExists(packet, _) {
      console.warn(`[CLΔ Discovery] Lobby already exists: ${packet.payload}`)
    }

    _handlePeerLeft(packet, _) {
      const self = this;
      console.log(`[CLΔ Discovery] Peer ${packet.payload} left the lobby, closing connection.`)
      self.core.disconnectFromPeer({ ID: packet.payload })
    }

    _handlePeerJoin(packet, _) {
      const self = this;
      console.log(`[CLΔ Discovery] Peer ${packet.payload} joined lobby, attempting to establish a connection.`)
      self.core.connectToPeer({ ID: packet.payload })
    }
 
    _handleRegisterAck (packet, _) {
      console.log(`[CLΔ Discovery] Successfully registered as "${packet.payload}"`)
    }
    
    _handleHostAck (packet, _) {
      const self = this
      console.log(`[CLΔ Discovery] Successfully hosted lobby: ${packet.payload}`)
      self.currentLobby = { lobby_id: packet.payload }; // Store basic info
      Scratch.vm.runtime.startHats('cldeltadiscovery_whenLobbyHosted')
    }

    _handleConfigRequired(_, __) {
      console.warn(`[CLΔ Discovery] Configuration required. Must create or join a lobby before doing that.`)
    }

    _handlePeerAck (packet, _) {
      const self = this
      console.log(`[CLΔ Discovery] Successfully joined lobby: ${packet.payload}`)
      self.currentLobby = { lobby_id: packet.payload };
      Scratch.vm.runtime.startHats('cldeltadiscovery_whenLobbyJoined')
    }
    
    // --- Block Implementations ---

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
            'use peer discovery@[DESIGNATION] for discovery services',
            {
              DESIGNATION: args.string('US-NKY-1')
            }
          ),
          opcodes.command(
            'setLobbyListOutput',
            'store the lobby list in [LIST]',
            {
              LIST: args.string('my list', {
                // Tell Scratch this accepts list menus
                acceptsReporters: true,
                variableType: 'list'
              })
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
          opcodes.boolean(
            'isDiscoveryServerOnline',
            'is the discovery server online?'
          ),
          opcodes.reporter('myInstanceID', 'my instance id'),
          opcodes.reporter('getCurrentLobby', 'current lobby'),
          opcodes.boolean('isInLobby', 'am I in a lobby?'),
          opcodes.boolean('isLobbyState', 'am I a lobby [STATE]?', {
            STATE: args.string('host', { menu: 'lobbystate' })
          }),
          opcodes.separator(),

          // Peer resolver
          opcodes.label('Peer resolver'),
          opcodes.event(
            'whenPeerResolveFinishes',
            'when I finish resolving a peer',
          ),
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
          opcodes.event(
            'whenLobbyResolveFinishes',
            'when I finish resolving a lobby',
          ),
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
          opcodes.event(
            'whenLobbyHosted',
            'when I host a lobby',
          ),
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
          opcodes.event(
            'whenLobbyJoined',
            'when I join a lobby',
          ),
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
              Scratch.translate('instance id'),
              Scratch.translate('designation'),
              Scratch.translate('round-trip time from discovery server (ms)'),
              Scratch.translate('hosting a lobby?'),
              Scratch.translate('member of a lobby?'),
              Scratch.translate('current lobby'),
            ]
          }
        }
      }
    }

    /**
     * This is the "hijacked" createPeer function.
     * It's called by the Core when discovery is enabled.
     */
    hijackedCreatePeer (id) {
      const self = this
      
      // 1. Save the preferred ID
      self.preferredID = id
      if (!self.preferredID) {
        console.warn('[CLΔ Discovery] createPeer block was run with an empty ID.')
        return
      }

      // 2. Generate the UUID
      const uuid = crypto.randomUUID()
      
      // 3. Call the Core's spawn peer function
      self.core._spawnPeer(uuid)
      
      // 4. Now, if we're already connected to the server,
      //    we can register immediately.
      //    If not, onCorePeerOpen will handle it.
      if (self.isDiscoveryServerOnline()) {
        self.registerPreferredID()
      }
    }

    myInstanceID () {
      const self = this
      // Return the ID we saved from the 'peer_open' callback
      return Scratch.Cast.toString(self.instanceId)
    }

    setDesignation ({ DESIGNATION }) {
      const self = this
      if (!self.core) return
      self.discoveryServerID = `discovery@${Scratch.Cast.toString(DESIGNATION)}`
      console.log(`[CLΔ Discovery]  Server set to: ${self.discoveryServerID}`)
    }

    setLobbyListOutput ({ LIST }, util) {
      const self = this
      // Find the Scratch list object and store a reference to it
      const list = util.target.lookupVariableByNameAndType(LIST, 'list')
      if (list) {
        self.lobbyListTarget = list
        console.log(`[CLΔ Discovery]  Lobby list output set to: ${list.name}`)
      } else {
        console.warn(`[CLΔ Discovery]  Could not find list named: ${LIST}`)
      }
    }

    toggleDiscoveryServices ({ ENABLER }) {
      const self = this
      if (!self.core) return

      const enable = Scratch.Cast.toString(ENABLER) === 'enable'
      
      if (enable) {
        if (self.isEnabled) return
        self.isEnabled = true

        // --- Hijack the Core's block ---
        self.core._remap('createPeer', this.hijackedCreatePeer.bind(self))
        
        // If Core is already open, try to connect
        if (self.core.isPeerConnected()) {
          this.connectToDiscoveryServer()
        }
      } else {
        if (!self.isEnabled) return
        self.isEnabled = false

        // --- Restore the Core's original function ---
        self.core._unmap('createPeer')
        
        // Disconnect from the server
        if (self.discoveryServerID && self.core.isOtherPeerConnected({ ID: self.discoveryServerID })) {
          self.core.disconnectFromPeer({ ID: self.discoveryServerID })
          console.log(`[CLΔ Discovery]  Disconnected from server: ${self.discoveryServerID}`)
        }
      }
    }

    isDiscoveryServicesEnabled () {
      const self = this
      if (!self.core) return false
      return self.isEnabled
    }

    isDiscoveryServerOnline() {
      const self = this
      if (!self.core || !self.discoveryServerID) return false
      return self.isEnabled && self.core.isOtherPeerConnected({ ID: self.discoveryServerID })
    }

    resolvedPeerInfo ({ PEER, INFO }) {
      const self = this
      const username = Scratch.Cast.toString(PEER)
      const infoType = Scratch.Cast.toString(INFO)
      
      const resolved = self.resolvedPeerCache.get(username)
      if (!resolved) return ''

      switch (infoType) {
        case 'online?':
          return resolved.online ? resolved.online : false
        case 'designation':
          return resolved.designation ? resolved.designation : ''
        case 'instance id':
          return resolved.instance_id ? resolved.instance_id : ''
        case 'round-trip time from discovery server (ms)':
          return resolved.rtt ? resolved.rtt : 0
        case 'hosting a lobby?':
          return resolved.is_lobby_host ? resolved.is_lobby_host : false
        case 'member of a lobby?':
          return resolved.is_lobby_member ? resolved.is_lobby_member : false
        case 'current lobby':
          return resolved.lobby_id ? resolved.lobby_id : ''
        default:
          return ''
      }
    }

    resolvePeer ({ PEER }) {
      const self = this
      if (!self.core || !self.isDiscoveryServicesEnabled()) return
      
      self.core._send({
        opcode: 'QUERY', // Stubbed command
        payload: Scratch.Cast.toString(PEER),
        target: self.discoveryServerID
      })
    }

    hostLobby ({ LOBBY, PEERS, PASSWORD, LOCK, HIDDEN, METADATA }) {
      const self = this
      if (!self.core || !this.isDiscoveryServicesEnabled()) return
      
      const packet = {
        opcode: 'CONFIG_HOST',
        payload: {
          lobby_id: Scratch.Cast.toString(LOBBY),
          password: Scratch.Cast.toString(PASSWORD),
          max_peers: Scratch.Cast.toNumber(PEERS),
          locked: Scratch.Cast.toBoolean(LOCK),
          hidden: Scratch.Cast.toBoolean(HIDDEN),
          metadata: Scratch.Cast.toString(METADATA)
        },
        target: self.discoveryServerID
      }
      self.core._send(packet)
    }
    
    joinLobby ({ LOBBY, PASSWORD }) {
      const self = this
      if (!self.core || !self.isDiscoveryServicesEnabled()) return
      
      const packet = {
        opcode: 'CONFIG_PEER',
        payload: {
          lobby_id: Scratch.Cast.toString(LOBBY),
          password: Scratch.Cast.toString(PASSWORD)
        },
        target: self.discoveryServerID
      }
      self.core._send(packet)
    }
    
    refreshLobbyList () {
      const self = this
      if (!this.core || !this.isDiscoveryServicesEnabled()) return

      const packet = {
        opcode: 'LOBBY_LIST',
        target: self.discoveryServerID
      }
      self.core._send(packet)
    }

    resolveLobby ({ LOBBY }) {
      const self = this
      if (!self.core || !self.isDiscoveryServicesEnabled()) return

      const packet = {
        opcode: 'LOBBY_INFO',
        payload: Scratch.Cast.toString(LOBBY),
        target: self.discoveryServerID
      }
      self.core._send(packet)
    }

    updateLockFlag ({ LOCK }) {
      const self = this
      if (!self.core) return
    }

    updateHiddenFlag ({ VISIBILITY }) {
      const self = this
      if (!self.core) return
    }

    updatePlayerLimit ({ LIMIT }) {
      const self = this
      if (!self.core) return
    }

    updateLobbyPassword ({ PASSWORD }) {
      const self = this
      if (!self.core) return
    }

    kickFromLobby ({ PEER }) {
      const self = this
      if (!self.core) return
    }

    transferLobby ({ PEER }) {
      const self = this
      if (!self.core) return
    }

    closeLobby () {
      const self = this
      if (!self.core || !self.isDiscoveryServicesEnabled() || !self.isInLobby()) return
      if (self.amIPeer) return // Peers must use LEAVE
      const packet = {
        opcode: 'CLOSE',
        target: self.discoveryServerID
      }
      self.core._send(packet)
    }

    leaveLobby () {
      const self = this
      if (!self.core || !self.isDiscoveryServicesEnabled() || !self.isInLobby()) return
      if (self.amIHost) return // Hosts must use CLOSE or TRANSFER
      const packet = {
        opcode: 'LEAVE',
        target: self.discoveryServerID
      }
      self.core._send(packet)
    }

    getCurrentLobby () {
      const self = this
      return self.currentLobby ? self.currentLobby.lobby_id : ''
    }

    isInLobby () {
      const self = this
      return !!self.getCurrentLobby()
    }

    isLobbyState ({ STATE }) {
      const self = this
      if (!self.isInLobby()) return false
      const state = Scratch.Cast.toString(STATE)
      switch (state) {
        case 'host':
          return self.amIHost
        case 'peer':
          return self.amIPeer
        default:
          return false
      }
    }

    resolvedLobbyInfo ({ LOBBY, INFO }) {
      const self = this
      const lobbyId = Scratch.Cast.toString(LOBBY)
      const infoType = Scratch.Cast.toString(INFO)
      
      const info = self.resolvedLobbyInfoCache.get(lobbyId)
      if (!info) return ''
      
      switch (infoType) {
        case 'current host':
          return info.host
        case 'current player limit':
          return info.max_peers
        case 'current player count':
          return info.current_peers
        case 'metadata':
          return info.metadata
        case 'hidden?':
          return info.hidden
        case 'password required?':
          return info.password_required // Assumes this property exists
        default:
          return ''
      }
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
