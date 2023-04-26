<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <q-input
          bottom-slots
          class="new-qweet"
          v-model="newQweetContent"
          placeholder="What's happening?"
          counter
          maxlength="280"
          autogrow
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50">
              </q-avatar>
            </template>
          </q-input>
      </div>
      <div class="col-shrink">
        <q-btn
          @click="addNewQweet"
          unelevated
          class="q-mb-lg"
          rounded
          no-caps
          color="primary"
          label="Qweet"
          :disable="!newQweetContent"
        />
      </div>
    </div>

    <q-separator class="divider" size="10px" color="grey-2"/>

    <q-list separator>
      <q-item
        v-for="(qweet, index) in qweetsWithRelativeDate"
        :key="qweet.date"
        class="q-py-md"

        >
        <q-item-section avatar top>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong>Janet Smith</strong>
            <span class="text-grey-7">
              @janey_smith
            </span>
          </q-item-label>
          <q-item-label class="qweet-content text-body1">
            {{ qweet.content }}
          </q-item-label>
          <div class="qweet-icons row justify-between q-mt-sm">
            <q-btn flat round color="grey" size="sm" icon="far fa-comment" />
            <q-btn flat round color="grey" size="sm" icon="fas fa-retweet" />
            <q-btn flat round color="grey" size="sm" icon="far fa-heart" />
            <q-btn @click="deleteQweet(index)" flat round color="grey" size="sm" icon="fas fa-trash" />
          </div>
        </q-item-section>
        <q-item-section side top>
          {{ qweet.relativeDate }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { formatDistance, subDays } from 'date-fns'


export default defineComponent({
  name: 'PageHome',
  data() {
    return{
      newQweetContent: '',
      qweets:[
        {
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit numquam vitae voluptatibus explicabo, deserunt sapiente sint repellendus aut, minus vero porro repellat impedit qui et adipisci. Odit at accusamus unde!",
          date: 1682529504300
        },
        {
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit numquam vitae voluptatibus explicabo, deserunt sapiente sint repellendus aut, minus vero porro repellat impedit qui et adipisci. Odit at accusamus unde!",
          date: 1682529528310
        },
      ]
    }
  },
  methods: {
    relativeDate(dataDate: number): string {
      const value = new Date(dataDate);
      return formatDistance(dataDate, new Date(), { addSuffix: true });
    },
    addNewQweet() {
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now()
      }
      this.qweets.unshift(newQweet)
      this.newQweetContent = ""
    },
    deleteQweet(index: number) {
      this.qweets.splice(index, 1);
    }
  },
  computed: {
    qweetsWithRelativeDate() {
      return this.qweets.map(qweet => ({
        ...qweet,
        relativeDate: this.relativeDate(qweet.date),
      }));
    },
  },
});
</script>

<style lang="sass">
.new-qweet
    textarea
      font-size: 18px
      line-height: 1.4
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.qweet-content
  white-space: pre-line
.qweet-icons
  margin-left: -5px
  max-width: 480px
</style>
