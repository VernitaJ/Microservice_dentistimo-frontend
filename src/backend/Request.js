import { useSubscription } from 'mqtt-react-hooks';

export default Request = () => {
    let { client } = this.props;
    client.publish('frontend/timeslot', 'hahah');
}

export default useSubscription('frontend/timeslot/#')(Request)