<template>
    <button type="button" class="btn" style="float: right" :style="button_style.style ? button_style.style : ''" @click="async () => {
        await $emit('modal-event');
        openModal();
    }">
        {{ button_style.content }}
    </button>
    <div class="modal fade" id="modal_demo" tabindex="-1" aria-labelledby="modal_demo_label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_demo_label">{{ mod_label }}</h5>
                    <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    {{ modal_desctiption }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Закрыть</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Modal } from 'bootstrap';
export default {
    emits: ['modal-event'],
    setup() {
    },
    props: {
        button_style: {
            content: String,
            style: Object | null
        },
        mod_label: String | null,
        modal_desctiption: String | null,
    },
    data() {
        return {
            modal_state: null,
        }
    },
    async mounted() {
        this.modal_state = new Modal('#modal_demo', {})
    },
    methods: {
        async openModal() {
            this.modal_state.show();
        },
        closeModal() {
            this.modal_state.hide();
        }
    },
}
</script>