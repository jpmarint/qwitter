<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-widht full-height">
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
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
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
                  &nbsp;
                  @janey_smith
                  &nbsp; <br class="lt-md"><span class="gt-sm"> &bull; &nbsp;</span>
                  {{ qweet.relativeDate }}
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
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { formatDistance } from 'date-fns'
import db from 'src/boot/firebase'
import { collection, doc, deleteDoc , addDoc, onSnapshot } from 'firebase/firestore';

interface Qweet {
  id?: string;
  content: string;
  date: number;
  relativeDate?: string;
}

export default defineComponent({
  name: 'PageHome',
  data() {
    return {
      newQweetContent: '',
      qweets: [] as Qweet[]
    }
  },
  methods: {
    relativeDate(dataDate: number): string {
      if (isNaN(dataDate)) {
        return 'Invalid date';
      }
      return formatDistance(new Date(dataDate), new Date(), { addSuffix: true });
    },
    async addNewQweet() {
      let newQweet: Qweet = {
        content: this.newQweetContent,
        date: Date.now()
      }
      await addDoc(collection(db, "Qweets"), newQweet);
      this.newQweetContent = ""
    },
    async deleteQweet(index: number) {
      await deleteDoc(doc(db, "Qweets", "DC"));
    }
  },
  computed: {
    qweetsWithRelativeDate(): Qweet[] {
      return this.qweets.map(qweet => ({
        ...qweet,
        relativeDate: this.relativeDate(Number(qweet.date)),
      }));
    },
  },
  async mounted() {
  const qweetsCollection = collection(db, "Qweets");
  onSnapshot(qweetsCollection, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New qweet: ", change.doc.data());
        const newQweet: Qweet = {
          id: change.doc.id,
          content: change.doc.data().content,
          date: change.doc.data().date,
        }
        this.qweets.unshift(newQweet)
      }
      if (change.type === "modified") {
        console.log("Modified qweet: ", change.doc.data());
        // Find the index of the modified qweet in the qweets array
        // const index = this.qweets.findIndex(qweet => qweet.id === change.doc.id);
        // // Update the qweet at the found index with the new data
        // this.qweets.splice(index, 1, change.doc.data());
      }
      if (change.type === "removed") {
        console.log("Removed qweet: ", change.doc.data());
        // Find the index of the removed qweet in the qweets array
        // const index = this.qweets.findIndex(qweet => qweet.id === change.doc.id);
        // // Remove the qweet at the found index from the qweets array
        // this.qweets.splice(index, 1);
      }
    });
  });
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


