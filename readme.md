Besides normal string matching you can add matching for regular expressions in the JSON files manually. See the following example. Regular expression matches can also be combined with normal string matching.

```json
{
    "colorMappings": {
        ".*\\.local": {
            "regexp": true,
            "color": "#00FF00"
        },
        "www.google.com": "#FF0000"
    }
}
```