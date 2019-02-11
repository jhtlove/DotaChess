import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-name-edit',
  templateUrl: './name-edit.component.html',
  styleUrls: ['./name-edit.component.css']
})
export class NameEditComponent implements OnInit {
  heros = [];
  count = 0;
  heroTypes = {
    'zhanShi': '战士',
    'qiShi': '骑士',
    'shouRen': '兽人',
    'wangLing': '亡灵',
    'shuShi': '术士',
    'sheShou': '射手',
    'faShi': '法师',
    'deLuYi': '德鲁伊',
    'jingLing': '精灵',
    'long': '龙',
    'ciKe': '刺客',
    'diJing': '地精',
    'gongJiang': '工匠',
    'juMo': '巨魔',
    'renLei': '人类',
    'aiRen': '矮人',
    'eMo': '恶魔',
    'eMoLieShou': '恶魔猎手'
  };

  keys = Object.keys(this.heroTypes);

  hero = new FormGroup({});
  name = new FormControl('');
  price = new FormControl('');
  controls = [];

  constructor(private client: HttpClient) {
    // const that = this;
    // Object.keys(this.heroTypes).forEach(function (key) {
    // function 中使用外部函数 借助that
    //   console.log(that.heroTypes[key]);
    // });
    for (let i = 0; i < this.keys.length; i++) {
      this.controls[i] = new FormControl('');
    }
    // console.log(this.keys);
    this.getAllHeros();
  }

  ngOnInit() {

  }

  saveHero() {
    // post带上httpOption就发送不成功？？？
    // 后台 Access-Control-Allow-Headers限制了
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': 'my-auth-token'
    //   })
    // };
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const heroName = this.name.value;
    const price = this.price.value;
    const types = [];
    let index = 0;
    for (let i = 0; i < this.controls.length; i++) {
      if (this.controls[i].value) {
        const key = this.keys[i];
        types[index++] = this.heroTypes[key];
      }
    }
    const hero = new Hero(heroName, types, price);
    hero.display();

    let isExist = false;
    for (let i = 0; i < this.heros.length; i++) {
      if (this.heros[i].name === heroName) {
        this.heros[i] = hero; // 修改
        isExist = true;
      }
    }
    if (!isExist) {
      this.heros[this.count++] = hero; // 新增
      this.client.post('http://localhost:3000/hero', hero, httpOptions)
        .subscribe(data => {
          console.log(data);
        });
    }


  }

  getAllHeros() {
    this.client.get('http://localhost:3000/id', { params: {} })
      .pipe(

      )
      .subscribe(data => {
        // console.log(data);
      });
  }
  // setValue(i: number, key: string) {
  //   this.controls[i].value = this.heroTypes[key];
  //   console.log(this.controls[i].value);
  // }
}


// enum HeroTypeEnum { 战士, 骑士, 兽人, 亡灵, 术士, 射手, 法师, 德鲁伊, 精灵, 人类, 龙, 刺客, 矮人, 地精, 工匠, 巨魔 }



class Hero {
  public name: string;
  public race: string[];
  public price: number;

  constructor(name: string, type: string[], price: number) {
    this.name = name;
    this.race = type;
    this.price = price;
  }

  display() {
    console.log(this.name + ':' + this.race.join(',') + ':' + this.price);
  }

}
