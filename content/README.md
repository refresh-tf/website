Contributing content
--------------------

To add a new map:
- Create a file named "mapname.json" `in website/content/`
- Add the mapname to the list in `website/content/meta.json`
- Images that you refence in your files need to be placed in `website/assets/image/`

Refer to other maps for the expected structure of mapname.json.
If you are unfamiliar with json notation/syntax, I recommend using a json editor to validate your contribution https://codebeautify.org/online-json-editor

The JSON crash course:
----------------------

- A json object is delimited by `{}`.
- Objects have properties. Each property has a name and value.
```
{
  "propertyname1": "propertyvalue1",
  "propertyname2": "propertyvalue2"
}
```
- Name/value pairs are linked by `:`.
- Properties are separated by a `,`.
- The property name is always a string, delimited by `""`.
- The property value can have different types. Here, we only use strings `""`, arrays `[]` and objects `{}`.

- An array contains multiple values. Values are separated by `,`.
```["item1", "item2", "item3"]```

That's all there is to it, you can combine these simple things to achieve more complex structures
```
{
  "prefix": "cp",
  "name": "process",
  "thumbnail": "cp_process.jpeg",
  "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",

  "versions": [{
    "suffix": "f9",
    "download": "https://tf2maps.net/downloads/refresh-cp_process.9042/download?version=32201",
    "date": "12/30/2020",
    "changes": [{ "type": "fix",
                  "message": "The change message." },
                { "type": "improved",
                  "message": "The change message." },
                { "type": "revert",
                  "message": "The change message." },
                { "type": "custom",
                  "message": "The change message." }]
  }, {
    "suffix": "f8",
    "download": "",
    "date": "12/30/2020",
    "changes": [{ "type": "fix",
                  "message": "The change message" }]
  }]
}
```

Note: do not put a `,` after the last property of an object or the last item of an array, this is invalid. It will happen to you with enough copypasta.
