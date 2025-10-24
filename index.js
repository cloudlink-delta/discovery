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

(function (Scratch) {
	"use strict";
	const blockIcon =
		"data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%22312%22%20height%3D%22218%22%20viewBox%3D%220%200%20312%20218%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M155.88%200C194.829%200.000212318%20226.786%2030.1084%20229.987%2068.4414H237.391C278.466%2068.4414%20311.759%20101.922%20311.759%20143.221C311.759%20184.52%20278.466%20218%20237.391%20218H74.3682C33.2934%20218%200%20184.52%200%20143.221C0.000123011%20101.922%2033.2935%2068.4415%2074.3682%2068.4414H81.7715C84.9733%2030.1082%20116.931%200%20155.88%200ZM155.88%2010C122.221%2010%2094.5136%2036.0335%2091.7373%2069.2744L90.9717%2078.4414H74.3682C38.8684%2078.4415%2010.0001%20107.392%2010%20143.221C10%20179.049%2038.8683%20208%2074.3682%20208H237.391C272.891%20208%20301.759%20179.049%20301.759%20143.221C301.759%20107.392%20272.891%2078.4414%20237.391%2078.4414H220.788L220.023%2069.2744C217.246%2036.0337%20189.539%2010.0002%20155.88%2010Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M109.5%20180V172.5L149.85%2072.4502H162L202.2%20172.5V180H109.5ZM124.95%20167.85H186.6L161.55%20102.45C161.25%20101.65%20160.7%20100.2%20159.9%2098.1002C159.1%2096.0002%20158.3%2093.8502%20157.5%2091.6502C156.8%2089.3502%20156.25%2087.6002%20155.85%2086.4002C155.35%2088.4002%20154.75%2090.4502%20154.05%2092.5502C153.45%2094.5502%20152.8%2096.4002%20152.1%2098.1002C151.5%2099.8002%20151%20101.25%20150.6%20102.45L124.95%20167.85Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E";

	const menuIcon =
		"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzczIiBoZWlnaHQ9IjM3MyIgdmlld0JveD0iMCAwIDM3MyAzNzMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjE4Ni41IiBjeT0iMTg2LjUiIHI9IjE4Ni41IiBmaWxsPSIjMEY3RUJEIi8+CjxwYXRoIGQ9Ik0xODYuODggNjFDMjI1LjgyOSA2MS4wMDAyIDI1Ny43ODYgOTEuMTA4NCAyNjAuOTg3IDEyOS40NDFIMjY4LjM5MUMzMDkuNDY2IDEyOS40NDEgMzQyLjc1OSAxNjIuOTIyIDM0Mi43NTkgMjA0LjIyMUMzNDIuNzU5IDI0NS41MiAzMDkuNDY2IDI3OSAyNjguMzkxIDI3OUgxMDUuMzY4QzY0LjI5MzQgMjc5IDMxIDI0NS41MiAzMSAyMDQuMjIxQzMxLjAwMDEgMTYyLjkyMiA2NC4yOTM1IDEyOS40NDIgMTA1LjM2OCAxMjkuNDQxSDExMi43NzJDMTE1Ljk3MyA5MS4xMDgyIDE0Ny45MzEgNjEgMTg2Ljg4IDYxWk0xODYuODggNzFDMTUzLjIyMSA3MSAxMjUuNTE0IDk3LjAzMzUgMTIyLjczNyAxMzAuMjc0TDEyMS45NzIgMTM5LjQ0MUgxMDUuMzY4QzY5Ljg2ODQgMTM5LjQ0MiA0MS4wMDAxIDE2OC4zOTIgNDEgMjA0LjIyMUM0MSAyNDAuMDQ5IDY5Ljg2ODMgMjY5IDEwNS4zNjggMjY5SDI2OC4zOTFDMzAzLjg5MSAyNjkgMzMyLjc1OSAyNDAuMDQ5IDMzMi43NTkgMjA0LjIyMUMzMzIuNzU5IDE2OC4zOTIgMzAzLjg5MSAxMzkuNDQxIDI2OC4zOTEgMTM5LjQ0MUgyNTEuNzg4TDI1MS4wMjMgMTMwLjI3NEMyNDguMjQ2IDk3LjAzMzcgMjIwLjUzOSA3MS4wMDAyIDE4Ni44OCA3MVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNDAuNSAyNDFWMjMzLjVMMTgwLjg1IDEzMy40NUgxOTNMMjMzLjIgMjMzLjVWMjQxSDE0MC41Wk0xNTUuOTUgMjI4Ljg1SDIxNy42TDE5Mi41NSAxNjMuNDVDMTkyLjI1IDE2Mi42NSAxOTEuNyAxNjEuMiAxOTAuOSAxNTkuMUMxOTAuMSAxNTcgMTg5LjMgMTU0Ljg1IDE4OC41IDE1Mi42NUMxODcuOCAxNTAuMzUgMTg3LjI1IDE0OC42IDE4Ni44NSAxNDcuNEMxODYuMzUgMTQ5LjQgMTg1Ljc1IDE1MS40NSAxODUuMDUgMTUzLjU1QzE4NC40NSAxNTUuNTUgMTgzLjggMTU3LjQgMTgzLjEgMTU5LjFDMTgyLjUgMTYwLjggMTgyIDE2Mi4yNSAxODEuNiAxNjMuNDVMMTU1Ljk1IDIyOC44NVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=";


	// Require the plugin to be unsandboxed
	if (!Scratch.extensions.unsandboxed) {
		alert("The CloudLink Delta Discovery plugin must be loaded in an unsandboxed environment.");
		return;
	}

	// Require access to the VM and/or runtime
	if (!Scratch.vm || !Scratch.vm.runtime) {
		alert(
			"The CloudLink Delta Discovery plugin could not detect access to the Scratch VM and/or runtime; this plugin won't work."
		);
		return;
	}

	// Require browser to support Web Locks API (used for concurrency)
	if (!navigator.locks) {
		alert(
			"The CloudLink Delta Discovery plugin could not detect Web Locks support; this plugin won't work."
		);
		return;
	}

	// Require core extension to be loaded
	const core = Scratch.vm.runtime.ext_cldelta_core;
	if (!core) {
		alert(
			"The CloudLink Delta Discovery plugin could not detect the CloudLink Delta Core extension; please load it first."
		);
		return;
	}

	class CloudLinkDelta_Discovery {
		constructor() { }

		getInfo() {
			return {
				id: "cldeltadiscovery",
				name: "CLΔ Discovery",
				menuIconURI: menuIcon,
				blockIconURI: blockIcon,
				color1: "#0F7EBD",
				blocks: [
					{
                        opcode: "my_global_id",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("my global id"),
					},
					"---",
					{
						opcode: "use_discovery_server",
						blockType: Scratch.BlockType.COMMAND,
						text: Scratch.translate("use designation [DESIGNATION] for discovery"),
						arguments: {
							DESIGNATION: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "US-NKY-1",
							},
						},
					},
					"---",
					{
                        opcode: "peer_info",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("peer [PEER] [INFO]"),
						arguments: {
							PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "B",
                            },
							INFO: {
								type: Scratch.ArgumentType.NUMBER,
								menu: "peerinfo",
								acceptReporters: false,
								defaultValue: "online?",
							}
						}
                    },
					{
                        opcode: "query_peer",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("query peer [PEER]"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "B",
                            },
                        },
                    },
					"---",
					{
                        opcode: "is_lobby_host",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: Scratch.translate("am I the lobby host?"),
                    },
                    {
                        opcode: "init_host_mode",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "host a lobby named [LOBBY] with player limit: [PEERS] password: [PASSWORD] locked: [LOCK] hidden: [HIDDEN]"
                        ),
                        arguments: {
                            LOBBY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "DemoLobby",
                            },
                            PEERS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "-1",
                            },
                            PASSWORD: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "",
                            },
                            LOCK: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false,
                            },
                            HIDDEN: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false,
                            },
                        },
                    },
                    {
                        opcode: "set_lock_flag",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "set locked access to [LOCK]"
                        ),
                        arguments: {
                            LOCK: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false,
                            },
                        },
                    },
                    {
                        opcode: "set_player_limit_value",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "set the player limit to [LIMIT]"
                        ),
                        arguments: {
                            LIMIT: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "-1",
                            },
                        },
                    },
                    {
                        opcode: "set_password_value",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "set the lobby password to [PASSWORD]"
                        ),
                        arguments: {
                            PASSWORD: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "change me",
                            },
                        },
                    },
                    {
                        opcode: "kick_peer_from_lobby",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "kick [PEER] from the lobby"
                        ),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "B",
                            },
                        },
                    },
                    {
                        opcode: "transfer_ownership",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "transfer ownership of the lobby to [PEER]"
                        ),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "B",
                            },
                        },
                    },
                    {
                        opcode: "close_lobby",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "close lobby"
                        ),
                    },
					"---",
					{
                        opcode: "current_lobby",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("current lobby"),
                    },
                    {
                        opcode: "lobby_list",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("lobby list"),
                    },
                    {
                        opcode: "query_lobbies",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("refresh public lobbies list"),
                    },
					{
                        opcode: "lobby_info",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("lobby [LOBBY] [INFO]"),
						arguments: {
							LOBBY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "DemoLobby",
                            },
							INFO: {
								type: Scratch.ArgumentType.NUMBER,
								menu: "lobbyinfo",
								acceptReporters: false,
								defaultValue: "host",
							}
						}
                    },
                    {
                        opcode: "query_lobby",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("query lobby [LOBBY]"),
                        arguments: {
                            LOBBY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "DemoLobby",
                            },
                        },
                    },
					"---",
					{
                        opcode: "init_peer_mode",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "join lobby [LOBBY] with password: [PASSWORD]"
                        ),
                        arguments: {
                            LOBBY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "DemoLobby",
                            },
                            PASSWORD: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "",
                            },
                        },
                    },
				],
				menus: {
					lobbyinfo: {
						items: [
							{
								text: Scratch.translate("host"),
								value: 0,
							},
							{
								text: Scratch.translate("current player limit"),
								value: 1,
							},
							{
								text: Scratch.translate("current player count"),
								value: 2,
							},
							{
								text: Scratch.translate("metadata"),
								value: 3,
							},
							{
								text: Scratch.translate("hidden?"),
								value: 4,
							},
							{
								text: Scratch.translate("password required?"),
								value: 5,
							},
						],
					},
					peerinfo: {
						items: [
							{
								text: Scratch.translate("online?"),
								value: 0,
							},
							{
								text: Scratch.translate("hosting a lobby?"),
								value: 1,
							},
							{
								text: Scratch.translate("member of a lobby?"),
								value: 2,
							},
							{
								text: Scratch.translate("current lobby"),
								value: 3,
							},
							{
								text: Scratch.translate("designation"),
								value: 4,
							},
							{
								text: Scratch.translate("global id"),
								value: 5,
							},
						],
					}
				},
			};
		}

		my_global_id() {
			// TODO
			return "";
		}

		use_discovery_server({DESIGNATION}) {
			// TODO
		}

		peer_info({PEER, INFO}) {
			// TODO
		}

		query_peer({PEER}) {
			// TODO
		}

		is_lobby_host() {
			// TODO
			return false;
		}

		init_host_mode({LOBBY, PEERS, PASSWORD, LOCK, HIDDEN}) {
			// TODO
		}

		set_lock_flag({LOCK}) {
			// TODO
		}

		set_player_limit_value({LIMIT}) {
			// TODO
		}

		set_password_value({PASSWORD}) {
			// TODO
		}

		kick_peer_from_lobby({PEER}) {
			// TODO
		}

		transfer_ownership({PEER}) {
			// TODO
		}

		close_lobby() {
			// TODO
		}

		current_lobby() {
			// TODO
			return "";
		}

		lobby_list() {
			// TODO
			return "[]";
		}

		query_lobbies() {
			// TODO
		}

		lobby_info({LOBBY, INFO}) {
			// TODO
			return "";
		}

		query_lobby({LOBBY}) {
			// TODO
		}

		init_peer_mode({LOBBY, PASSWORD}) {
			// TODO
		}
	}

	// Register the plugin
	const discovery = new CloudLinkDelta_Discovery();
	Scratch.extensions.register(discovery);
	Scratch.vm.runtime.ext_cldelta_discovery = discovery;

	// Register plugin with core
	if (!core.plugins.includes("discovery")) {
		core.plugins.push("discovery");
	}

	console.log("CLΔ Discovery plugin loaded.");
})(Scratch);