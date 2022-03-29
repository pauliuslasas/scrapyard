# Paulius Lašas onboarding task

## Basic usage instructions

Application **startup**:

> **npm start**
>
> **npm run start:dev**

Database **migrations** and **seeds**:

> **npm run db --help**

Application **build**:

> **npm build**

Code **linting**:

> **npm run lint**
>
> **npm run lint:fix**

Code **testing**:

> **npm test**
>
> **npm run test:coverage**

---

## Part update flow requirements

Basic part model should look like:

```
/**
* Enum representing available part materials
*/
enum PartMaterials {
    Plastic = 'plastic',
    Metal = 'metal',
    Wood = 'wood',
    Rubber = 'rubber'
    Vintage = 'vintage'
}

/**
* Model representing part structure
*/
class Part {
    name: string;
    type: PartMaterials;
    age: number;
    rustiness: number;
    quality: number;
    price: number;
}
```

Each request batch parts update will be impacted based on weather conditions.

Let's assume that there will be X random weather conditions. Each time part will be updated we will choose a single random weather condition which will drive logic how parameters such as: `rustiness`, `quality`, `price` will be affected dependant on the part `type`.

EXAMPLES:

Weather conditions:

1. 'Salty winter'
2. 'Rainy autumn'
3. 'Cloudy spring'
4. 'Sunny summer'

Age conditions:

1. Parts start with `age` **0**. Every season parts `age` increase by **1** regardless of part type.
2. If part `age` exceeds **20** and is not fully rusted or vintage, part is considered too old and its `quality`, `price` is set to **0**.
3. If part type is `PartMaterials.Vintage` and part age > **10** it's `price` increases by **10%**. It can maximum reach `price` of **200**.

Rustiness conditions:

1. Parts start with `rustiness` **0**. Every season parts rust depending on the season and the part type.
2. Seasons increase `rustiness` by fixed amount + part type fixed amount.
3. Winter increases `rustiness` by **4**, Autumun - **3**, Spring - **2**, Summer - **1**.
4. Metal increases `rustines` by **3**, Vintage - **2**, Wood - **2**, Rubber - **1**, Plastic - **1**

Quality conditions:

1. Parts start with `quality` **100**. Every season parts quality degrade depending on parts rust.
2. Parts degrade by **70%** of the rust increase this season.
3. If the season was winter and part was plastic its `rustiness` increased by **5** therefore its quality was reduced by **70%** from the number **5** which is equal to **3.5**

Price conditions:

1. Parts start with `price` **100**. Every season parts price decline depending on parts quality and its type. Unless the part is Vintage.
2. If `quality` is less than **40**, `price` reduces by **10%**, elsewise it reduces by percentage depengin of part type.
3. Vintage parts price starts to increase by **10%** when its `age` reaches **10**

Example conditions:

1. > `Salty winter`
   >
   > Example part:
   >
   > `Axle shaft`
   >
   > Example type:
   >
   > `PartMaterials.Metal`
   >
   > Example possible behaviour:
   >
   > `age` increase by **1**
   >
   > `rustiness` increases by **7**
   >
   > `quality` drops by **4.9**
   >
   > `price` mutates as following:
   >
   > if `quality` is less than **40**
   >
   > it reduces by **10%**
   >
   > elsewise it reduces by **5%**
   >
   > Note: if part type is `PartMaterials.Vintage` and part age > **10** it's `price` increases by **10%**. It can maximum reach `price` of **200**.

2. > `Sunny Summer`
   >
   > Example part:
   >
   > `Coolant reservoir`
   >
   > Example type:
   >
   > `PartMaterials.Plastic`
   >
   > Example possible behaviour:
   >
   > `age` increase by **1**
   >
   > `rustiness` increases by **2**
   >
   > `quality` drops by **1.4**
   >
   > `price` mutates as following:
   >
   > if `quality` is less than **40**
   >
   > it reduces by **10%**
   >
   > elsewise it reduces by **5%**
   >
   > Note: if part type is `PartMaterials.Vintage` and part age > **10** it's `price` increases by **10%**. It can maximum reach `price` of **200**.
