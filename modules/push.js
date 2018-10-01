exports.handle = function(
    sender,
    pieces,
    storageFactory,
    callback,
    yo_mama,
    message,
    web_container
) {
    let response_message = "";
    if (pieces.length > 0) {
        let new_topic = "";
        console.log(web_container.channels.list);
        console.log(message);
        // console.log(Object.keys(web_container));
        console.log(message.channel);
        let channel_info = web_container.channels.info(message.channel);
        console.log("channel info: " );
        console.log(channel_info);
        console.log("channel info channel: " );
        console.log(channel_info.channel)
        switch (pieces[0]) {
            case "join":
                new_topic = sender;
                if (channel_info.channel.topic) {
                    if (channel_info.channel.topic.length > 0) {
                        new_topic = channel_info.channel + " | " + new_topic;
                    }
                    web_container.channels.setTopic(message.channel, new_topic);
                }
                break;
            case "done":
                let topic = channel_info.channel.topic;
                new_topic = "";
                if (topic.length > 0) {
                    if (topic.indexOf("|") !== -1) {
                        let tail = topic.split(" | ").slice(1);
                        if (tail.length > 1) {
                            new_topic = tail.join(" | ");
                        } else {
                            new_topic = tail.join("");
                        }
                    }
                }
                web_container.channels.setTopic(message.channel, new_topic);
                break;
            default:
                response_message = pieces[0] + " is not a valid option";
        }
    } else {
        response_message = "Valid commands are 'join' and 'done'.";
    }
    callback({ message: response_message });
};