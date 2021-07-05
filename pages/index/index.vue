<template>
	<view class="top-content">
			<div class="title">常用链接</div>
			<u-card v-for="(item, index) in allData" :key="index" :title="item.urlName" :border="false" padding="20" margin="15rpx 30rpx">
				<view class="button-line" slot="body">
					<view class="card-button">
						<u-icon name="arrow-up-fill" :label-size="iconLabelSize" margin-left="10" label="顶" @click="goUp(item)"></u-icon>
					</view>
					<view class="card-button">
						<u-icon name="lock-opened-fill" :label-size="iconLabelSize" margin-left="10" label="公开"></u-icon>
					</view>
					<view class="card-button">
						<u-icon name="google-circle-fill" :label-size="iconLabelSize" margin-left="10" label="跳转"></u-icon>
					</view>
				</view>
			</u-card>
			<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="loadData"></u-loadmore>
			<u-toast ref="tip"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iconLabelSize: 28,
				loadStatus: 'loadmore',
				contentData: [],
				allData: [],
			}
		},
		onLoad() {
			this.loadData();
		},
		// 页面滚动到底部的事件（不是scroll-view滚到底），用于下拉下一页数据
		// onReachBottom使用注意 可在pages.json里定义具体页面底部的触发距离onReachBottomDistance，比如设为50，那么滚动页面到距离底部50px时，就会触发onReachBottom
		onReachBottom() {
			this.loadStatus = 'loading';
			// 模拟数据加载
			setTimeout(() => {
				this.loadData();
				this.loadStatus = 'loadmore';
			}, 1000)
		},
		methods: {
			loadData () {
				this.$api.get('api/share/content/query', {
				}).then((resp) => {
					console.log(resp)
					this.allData = resp.data.data
				});
				
				// uni.request({
				// 	url: 'api/share/content/query',
				// 	data: {
				// 		keyword: '',
				// 	},
				// 	success: (resp) => {
				// 		console.log(resp)
				// 		this.allData = resp.data.data
				// 	},
				// 	fail: (resp) => {
				// 		console.log(resp)
				// 	},
				// })
			},
			goUp (ret) {
				this.showToast();
				console.log(ret.id)
				let data = this.contentData
				let newData = {}
				data.forEach((item, index) => {
					if (ret.id === item.id) {
						newData = data[index]
					}
				})
				// newData.weight = Number(data[0].weight) + 1
				newData.weight = Number(ret.weight) + 1
				// this.axios.post('share/content/one/weight/update', {
				// 	...newData
				// }).then(() => {
				// 	this.loadData()
				// })
			},
			showToast() {
				this.$refs.tip.show({
					title: '+1',
					type: 'success',
					duration: 1000,
					icon: false,
					position: 'top',
				})
			}
		}
	}
</script>

<style lang="scss">
	.top-content {
		padding: 4px;
		background-color: #fafbfc;
		.title {
			display: block;
			margin: 12px 0 0 14px;
			font-size: 14px;
			color: #333333;
		}
		.button-line {
			display: flex;
			.card-button {
				margin-right: 48rpx;
			}
		}
	}
</style>
