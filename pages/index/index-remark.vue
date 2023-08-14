<template>
	<view class="content">
		<!-- #ifdef APP-PLUS || H5 -->
		<view id="container"></view>
		<!-- #endif -->
		<!-- #ifndef APP-PLUS || H5 -->
		<view>非 APP、H5 环境不支持</view>
		<!-- #endif -->
	</view>
</template>

<script module="Cesium" lang="renderjs">
	import {
		CONFIG
	} from 'static/config_url.js';
	export default {
		data() {
			return {
				domlist: null, // 动态引入dom标签合集
				viewer: null, // 三维视窗
				tilesetData: null, // 三维数据
				moduleHeight: 0 // 模型距离地表高度
			}
		},
		mounted() {
			this.initResources()
		},
		methods: {
			// 初始化资源，加载后例化cesium
			initResources() {
				if (this.domlist) {
					this.removeResource()
				} else {
					// 动态引入css文件
					const linkDom = document.createElement('link')
					linkDom.rel = "stylesheet"
					linkDom.href = "static/Cesium/Widgets/widgets.css"
					// linkDom.href = "https://cesium.com/downloads/cesiumjs/releases/1.84/Build/Cesium/Widgets/widgets.css"
					document.head.appendChild(linkDom)

					var datS = this.requireResources('script', 'static/dat.gui.js')
					var cesiumS = this.requireResources('script', 'static/Cesium/Cesium.js', this.initCesium)
					// var cesiumS = this.requireResources('script',
					// 	'https://cesium.com/downloads/cesiumjs/releases/1.84/Build/Cesium/Cesium.js', this.initCesium)
					this.domlist = [linkDom, datS, cesiumS]
				}
			},
			// 动态创建script引用第三方类库
			requireResources(dom, src, callback) {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement(dom)
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = src;
				document.head.appendChild(script);
				callback && (callback instanceof Function) && (script.onload = callback.bind(this));
				return script
			},
			// 移除动态添加的标签，避免重复添加标签
			removeResource() {
				if (this.domlist)
					for (let i = 0; i < this.domlist.length; i++) {
						document.head.removeChild(this.domlist[i])
					}
			},
			// 初始化
			initCesium() {
				// console.log(window.Cesium.VERSION) // APP可运行
				Cesium.Ion.defaultAccessToken =
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0M2NkNGRmNS0zZmE2LTQ5YTctOGNlOS0xZDc1MDIzOTgzOTIiLCJpZCI6NjI3OTIsImlhdCI6MTYyNzQ2MjE4NH0.JgeH5FotG5WCWhjiskSRE6y4ZVI4b4xoN_CWuFDtAdA';

				this.viewer = new Cesium.Viewer('container', {
					terrainProvider: Cesium.createWorldTerrain(), // 创建世界地形
					geocoder: false, //右上角 搜索
					// homeButton: false, //右上角 Home
					// sceneModePicker: false, //右上角 2D/3D切换
					// baseLayerPicker: false, //右上角 地形
					navigationHelpButton: false, //右上角 Help
					animation: false, // 左下角 圆盘动画控件
					timeline: false, //时间轴
					fullscreenButton: false, //右下角 全屏控件
					vrButton: false, // 如果设置为true，将创建VRButton小部件。
					scene3DOnly: true // 每个几何实例仅以3D渲染以节省GPU内存
					// infoBox: false //隐藏点击要素后的提示信息
				})
				this.viewer._cesiumWidget._creditContainer.style.display = 'none'; //隐藏版本信息
				this.viewer.scene.debugShowFramesPerSecond = true; // 显示帧数

				this.guiInit()
			},
			// gui初始化
			guiInit() {
				// gui窗口配置
				let guiOptions = {
					name: '3dTiles地址',
					value: [],
					namelist: []
				};
				for (let item in CONFIG) {
					guiOptions.value.push({
						name: item,
						value: CONFIG[item]
					});
					guiOptions.namelist.push(item);
				}

				// gui窗口
				const gui = new dat.GUI();
				gui.domElement.style.position = 'absolute';
				gui.domElement.style.left = '10px';

				// #ifdef H5
				gui.domElement.style.top = '45px';
				// #endif
				// #ifdef APP-PLUS 
				gui.domElement.style.top = '0';
				// #endif

				let f = gui.addFolder('三维模型');
				let changeEvent = f.add(guiOptions, 'name', guiOptions.namelist);
				let heightChange = f.add({
					height: this.moduleHeight
				}, 'height', -200, 200);
				f.open();


				// 模型切换
				changeEvent.onChange((value) => {
					guiOptions.value.forEach((item, index) => {
						if (item.name === value) {
							this.add3dTiels(item.value);
						} else {
							return;
						}
					});
				});

				// 模型高度调节
				heightChange.onChange((h) => {
					this.moduleHeight = h
					this.moduleHeightChange(this.tilesetData, h);
				});
			},
			// 添加3dtiles数据
			add3dTiels(url) {
				if (this.tilesetData) {
					this.removeData()
				} else if (!this.tilesetData) {
					// return;
				}
				// 请求3dtiles数据
				this.tilesetData = new Cesium.Cesium3DTileset({
					url: url
				});

				// 数据请求完成后加载
				this.tilesetData.readyPromise
					.then((tileset) => {
						this.viewer && this.viewer.scene.primitives.add(tileset);
						this.moduleHeightChange(tileset, this.moduleHeight);
						this.viewer.zoomTo(tileset);
					})
					.otherwise(function(error) {
						console.log(error);
					});
			},
			// 模型高度调整
			moduleHeightChange(tileset, height) {
				var cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
				var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
				var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, height);
				var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
				tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
			},
			// 移除模型数据
			removeData() {
				if (this.tilesetData) {
					this.tilesetData.destroy();
					this.tilesetData = null;
				}
			}

		},
		beforeDestroy() {
			this.removeData()
			this.removeResource()
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	#container {
		width: 100%;
		height: 500px;
		/* background: #0ff; */
	}
</style>
