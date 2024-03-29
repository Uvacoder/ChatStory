<template>
  <div>
    <ui-alert v-model="state.error" dismissible variant="error" class="my-6">
      {{ state.errorMessage }}
    </ui-alert>
    <h3 class="text-2xl font-semibold">Create a new account</h3>
    <p class="text-gray-500">
      Already have an account?
      <router-link to="/auth" class="text-primary underline cursor-pointer"> Sign In </router-link>
    </p>
    <form class="mt-10" @submit.prevent="register">
      <ui-input
        v-model="v$.username.$model"
        label="Username"
        block
        :error="v$.username.$dirty && v$.username.$invalid"
        :error-message="v$.username.$silentErrors[0]?.$message"
        show-detail
      ></ui-input>
      <ui-input
        v-model="v$.email.$model"
        block
        label="Email"
        placeholder="example@mail.com"
        :error="v$.email.$dirty && v$.email.$invalid"
        :error-message="v$.email.$silentErrors[0]?.$message"
        show-detail
      ></ui-input>
      <ui-input
        v-model="v$.password.$model"
        block
        label="Password"
        :type="state.showPassword ? 'text' : 'password'"
        placeholder="6+ Characters"
        :error="v$.password.$dirty && v$.password.$invalid"
        :error-message="v$.password.$silentErrors[0]?.$message"
        show-detail
      >
        <template #append>
          <ui-icon
            class="text-gray-500"
            :name="state.showPassword ? 'eye-off' : 'eye'"
            @click="state.showPassword = !state.showPassword"
          ></ui-icon>
        </template>
      </ui-input>
      <ui-button
        class="mt-12 w-full"
        block
        type="submit"
        variant="primary"
        :loading="state.loading"
      >
        Register
      </ui-button>
    </form>
  </div>
</template>
<script>
import { shallowReactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { email, required, minLength, maxLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useHead } from '@vueuse/head';
import auth, { fetchAPI } from '@/utils/auth';

export default {
  setup() {
    useHead({
      title: 'Sign Up | Chat Story',
    });

    const router = useRouter();

    const state = shallowReactive({
      loading: false,
      showPassword: false,
      error: false,
      errorMessage: '',
    });
    const formData = shallowReactive({
      email: '',
      password: '',
      username: '',
    });

    const rules = {
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(16),
      },
      email: {
        email,
        required,
      },
      password: {
        minLength: minLength(6),
        required,
      },
    };
    const v$ = useVuelidate(rules, formData);

    async function register() {
      try {
        v$.value.$touch();

        if (v$.value.$invalid) return;

        state.loading = true;

        const result = await fetchAPI('/user', {
          method: 'POST',
          body: JSON.stringify(formData),
        });

        state.loading = false;

        await auth.signIn(formData.email, formData.password);
        await auth.sendOobCode('VERIFY_EMAIL', formData.email);

        router.replace('/auth/verify');
      } catch (error) {
        state.error = true;
        state.errorMessage = 'Something went wrong';
        console.error(error);
      }
    }

    return {
      v$,
      state,
      register,
      formData,
    };
  },
};
</script>
<style scoped>
.divider:after {
  content: 'Or';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @apply bg-gray-50 py-2 px-4;
}
</style>
