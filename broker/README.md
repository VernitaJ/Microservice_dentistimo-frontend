# Mosquitto Broker

## Run the broker
### `docker-compose up`
Launches the broker

___

## Add a user to to the password file
https://mosquitto.org/man/mosquitto_passwd-1.html
___
## Add a user to the acl file
Control access to topics on the broker using an access control list file. \
If this parameter is defined then only the topics listed will have access. \
If the first character of a line of the ACL file is a # it is treated as a
comment. \
Topic access is added with lines of the format: \
`topic [read|write|readwrite] <topic>` \
The access type is controlled using "read", "write" or "readwrite". \
This parameter is optional (unless <topic> contains a space character) - if not
given then the access is read/write.  \
<topic> can contain the + or # wildcards as in subscriptions.

User specific topic ACLs are added after a user line as follows: \
user `<username>` \
The username referred to here is the same as in [password_file](./mqtt/password). It is not the clientid.