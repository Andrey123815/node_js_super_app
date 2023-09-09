# Kiru client
![Prettier/eslint](https://github.com/Mon-Keys/drssr/actions/workflows/pipeline.yml/badge.svg)

## Content
1. [Dependencies installing](#1)
2. [Starting app for expo](#2)
3. [Run on device via Expo Go](#2)
3. [Commit rules](#4)

### Dependencies installing <a name="1"></a>
```
npm installsfs
```

### Starting app for expo <a name="2"></a>
```
npx expo start --tunnel
```

### Run on device via Expo Go <a name="3"></a>
Для запуска приложения локально на вашем устройстве 
необходимо отсканировать QR-код, появившийся в консоли

### Commit rules <a name="4"></a>

Все коммиты должны соответствовать шаблону:
```['fix'|'ci'|'refact'|'code']:␣<описание коммита>```

В случае если нужно указать несколько тегов дополнительный тег можно указать в скобках.
Например, если это рефакторинг CI (изменение шага создания билда) команда на коммит будет выглядеть следующим образом:
```
git commit -m "ci(refact): rewrite build stage"
```

При согласовании всей командой, список ключей можно изменить в файле в корне проекта - ```commitlint.config.js```

Проверка именования коммита производится как локально, так и при пуше на сервере (commitlint.yml)

Отключать локальные проверки не рекоммендуется, однако можно следующими командами:
```
git commit --no-verify -m "..."
```
```
git push --no-verify
```
