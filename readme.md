# Discord Moderation & Social Bot

A powerful Discord bot built with Node.js and discord.js, offering advanced moderation tools (kick, ban, mute, warn with configurable thresholds) and fun social features (marry, divorce, adopt, makeparent, disown, emancipate, family tree).

## 🚀 Features

### Moderation

* **Kick**: `!kick @User [reason]` - Remove a user from the server.
* **Ban**: `!ban @User [reason]` - Ban a user from the server.
* **Mute**: `!mute @User` - Assign the `Muted` role.
* **Warn**: `!warn @User [reason]` - Issue a warning; stores warnings in `data/warnings.json`.
* **Set Warn Action**: `!setwarnaction <count> <mute|ban|kick> [duration]` - Configure actions at warning thresholds.
* **View Warnings**: `!warnings [@User]` - Display warnings and reasons.
* **Clear Warnings**: `!clearwarns @User` - Remove all warnings for a user.
* **Add Role**: `!addrole @User RoleName` - Grant a role.
* **Remove Role**: `!removerole @User RoleName` - Remove a role.
* **Help**: `!help` - List all commands.

### Social & Entertainment

* **Marry**: `!marry @User` - Propose and automatically marry another user.
* **Divorce**: `!divorce` - End your marriage.
* **Adopt**: `!adopt @User` - Adopt another user as your child.
* **Make Parent**: `!makeparent @User` - Mark someone as your parent.
* **Disown**: `!disown @User` - Disown one of your adopted children.
* **Emancipate**: `!emancipate @User` - Remove one of your parents.
* **Partner**: `!partner [@User]` - Show who someone’s partner is.
* **Parent**: `!parent [@User]` - Show someone’s parent(s).
* **Relationship**: `!relationship @User1 [@User2]` - Display the relationship between two users.
* **Family Size**: `!familysize [@User]` - Count parents and children.
* **Tree**: `!tree [@User]` - Display a full family tree with generations and arrows.
* **Blood Tree**: `!bloodtree [@User]` - Alias of `!tree`.

## 🔧 Usage

* Use `!help` to get a list of all available commands.
* All moderation commands require the bot to have appropriate permissions.
* Social commands can be used freely by any user.

## 📜 License

This project is open-source and available under the MIT License.

---

*Built with ❤️ by \Hasandas. *
