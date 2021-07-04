<template>
	<div>
		<div class="collection">
			<div v-for="(item, index) in items"
				:class="{ projection: item.isProjected }"
				:draggable="true"
				@drag="onDrag(index)"
				@dragend="onDragEnd"
				@dragenter="onDragEnter(index)"
				@dragleave="onDragLeave"
				@dragover="event => event.preventDefault()"
				@dragstart="onDragStart"
				class="item"
			>
				<ul>
					<li>{{ item.content }} ({{ item.id }})</li>
					<li>isProjected: {{ item.isProjected }}</li>
				</ul>
			</div>
		</div>

		<div class="feedback">
			<div>{{ this.origin }}</div>
			<div>{{ this.dragTarget }}</div>
			<div>{{ this.projection }}</div>
		</div>
	</div>
</template>
<script>

	const original = [
		'some', 'simple', 'little', 'example', 'to', 'proove', 'solution'
	]

	class Item {
		constructor(id, content) {
			this.id = id
			this.content = content

			this.isProjected = false
		}
	}

	export default {
		data: () => ({
			items: [],
			origin: null,
			dragTarget: null,
			projection: null
		}),
		created: function () {
			this.items = this.createItems()
		},
		methods: {
			onDragStart(event) {
				event.dataTransfer.effectAllowed = 'move'
			},
			onDragEnd() {
				this.replaceProjectionWithDragTarget()
				this.reset()
			},
			onDragEnter(index) {
				this.removeFromItems(this.projection)
				this.items.splice(index, 0, this.projection)
			},
			onDragLeave() {
				this.removeFromItems(this.projection)
				this.items.splice(this.origin, 0, this.projection)
			},
			onDrag(index) {
				if (! this.origin) this.origin = index
				if (! this.dragTarget) this.dragTarget = this.items[this.origin]
				if (! this.projection) this.createProjection()

				if (this.items.includes(this.dragTarget)) this.removeFromItems(this.dragTarget)
			},


			createItems() {
				return original.map((item, index) => new Item(index, item))
			},
			createProjection() {
				this.projection = {...this.dragTarget, isProjected: true}
			},
			removeFromItems(item) {
				const index = this.items.findIndex(i => i === item)
				if (index !== -1 ) this.items.splice(index, 1)
			},
			replaceProjectionWithDragTarget() {
				this.items.splice(this.items.findIndex(item => item === this.projection), 1, this.dragTarget)
			},
			reset() {
				this.origin = null
				this.dragTarget = null
				this.projection = null
			},
		}
	}
</script>
<style lang="scss">


	.projection {
		opacity: 0.2;
	}

	.collection {
		display: grid;
		gap: 16px;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: auto;
		padding: 16px;
	}

	.item {
		align-items: center;
		background-color: white;
		border-radius: 6px;
		border: 1px solid #ddd;
		box-shadow: 0 0 15px rgba(0,0,0,0.2);
		display: flex;
		height: 200px;
		justify-content: center;
		text-align: center;
		user-select: none;
		width: 200px;
	}
</style>