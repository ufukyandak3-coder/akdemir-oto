# 3D Model Slotu

Gerçek modeli buraya **`part.glb`** adıyla bırakın:

```
public/models/part.glb
```

Sistem `Model.tsx` içinde bir HEAD isteğiyle dosyanın varlığını otomatik
algılar (auto-takeover). Dosya yoksa prosedürel fren diski primitifi devreye
girer; `part.glb` eklendiği an gerçek model otomatik yüklenir.

Öneri: Draco/Meshopt ile sıkıştırılmış, < 5MB, gerçekçi PBR materyalli bir GLB.
Cam parçalar için materyal adında `glass`/`cam`/`lens` geçmesi yeterli — Material
Rescue bu materyallere dokunmaz.
