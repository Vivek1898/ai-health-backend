const Amplitude = require('@amplitude/node');
const AmplitudeClient = Amplitude.init(sails.config.custom.amplitudeApiKey);

module.exports = {


    /**
     * Create event  : Server Event
     * @param userId - User Id
     * @param distinctId - Distinct Id (Guest or User Id)
     * @param source - Source of origin
     * @param eventName - Name of event
     * @param eventProperty - JSON property relevant to event
     * @param headers - Headers in request
     * @param ip - IP of request
     * @param timelineEvent - Time Line Event Name
     * @param description - Description for timeline
     * @returns {Promise<void>}
     */

    createServerEvent: async (userId = 0, distinctId = '', source = 'WEB', eventName, eventProperty, headers, ip, timelineEvent, description) => {

        userId = userId | 0;
        distinctId = distinctId ? distinctId : '';

        if (!userId && !distinctId) {
            return;
        }

        await Event.create({
            userId: userId,
            distinctId: distinctId,
            source: source,
            eventName: eventName,
            eventProperty: eventProperty,
            headers: headers,
            ip: ip,
        });

        if (timelineEvent && description) {
            await UserTimeline.create({
                userId: userId,
                distinctId: distinctId,
                source: source,
                eventName: timelineEvent,
                description: description,
                ip: ip,
            });

        }

        if (sails.config.custom.serverEnv !== 'test') {

            await AmplitudeClient.logEvent({
                event_type: eventName,
                user_id: userId ? 'HEALTH-SERVICE' + userId : '0',
                device_id: distinctId ? distinctId : 'HEALTH-SERVICE' + userId,
                ip: ip,
                event_properties: eventProperty
            });
        }

    },

};
