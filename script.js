const DISCORD_ID = '678546996268630056'; 

async function fetchDiscordStatus() {
    const nameEl = document.getElementById('discord-name');
    const activityEl = document.getElementById('discord-activity');
    const avatarImg = document.getElementById('discord-avatar');
    const statusDot = document.getElementById('discord-status');


        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const data = await response.json();

        if (data.success) {
            const { discord_user, discord_status, activities } = data.data;
            nameEl.innerText = discord_user.global_name || discord_user.username;
            const avatarUrl = discord_user.avatar 
                ? `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png?size=256`
                : `https://ui-avatars.com/api/?name=${discord_user.username}&background=3c3836&color=ebdbb2`;
            avatarImg.src = avatarUrl;
            statusDot.className = `status-dot status-${discord_status}`;
            let activityText = "just chilling";
            if (activities && activities.length > 0) {
                const active = activities.find(a => a.type !== 4) || activities[0];
                
                if (active.type === 4) {
                    activityText = active.state || active.name;
                } else {
                    const verb = active.type === 2 ? 'Listening to' : 'Playing';
                    activityText = `${verb} ${active.name}`;
                }
            }
            activityEl.innerText = activityText;
        }
    } catch (err) {
        console.error("Lanyard error:", err);
        activityEl.innerText = "Offline / Error";
    }
}

fetchDiscordStatus();
setInterval(fetchDiscordStatus, 30000);
