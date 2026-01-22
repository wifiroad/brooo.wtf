<script>
    const DISCORD_ID = '678546996268630056'; 

    async function fetchDiscordStatus() {
        try {
            const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
            const result = await response.json();

            if (result.success) {
                const { discord_user, discord_status, activities } = result.data;

                document.getElementById('discord-name').innerText = discord_user.global_name || discord_user.username;
                
                document.getElementById('discord-avatar').src = discord_user.avatar 
                    ? `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png?size=256`
                    : `https://ui-avatars.com/api/?name=${discord_user.username}&background=3c3836&color=ebdbb2`;

                document.getElementById('discord-status').className = `status-dot status-${discord_status}`;

                let act = "Just vibeing";
                if (activities && activities.length > 0) {
                    const game = activities.find(x => x.type !== 4);
                    const custom = activities.find(x => x.type === 4);
                    if (game) {
                        act = `${game.type === 2 ? 'Listening to' : 'Playing'} ${game.name}`;
                    } else if (custom) {
                        act = custom.state || custom.name;
                    }
                }
                document.getElementById('discord-activity').innerText = act;
            }
        } catch (e) {}
    }

    fetchDiscordStatus();
    setInterval(fetchDiscordStatus, 15000);
</sc
    ript>
