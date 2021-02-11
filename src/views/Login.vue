<template>
	<section class="container">
		
		<div class="column is-4 is-offset-4">
			<form @submit.prevent="handleSubmit">
				<b-field label="Email">
					<b-input 
						type="email"
						v-model="user.email"
						:class="{ 'has-error': submitting && invalidEmail }"
						maxlength="30">
					</b-input>
				</b-field>

				<b-field label="Password">
					<b-input 
						type="password"
						v-model="user.password"
						:class="{ 'has-error': submitting && invalidPassword }"
						password-reveal
					>
					</b-input>
				</b-field>

				<p v-if="error && submitting" class="error-message">
					❗Please, fill out all required fileds
				</p>

				<b-button @click="handleSubmit" type="is-success" size="is-medium" >Log in</b-button>
			</form>
		</div>

	</section>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		name: 'Login',
		data() {
			return {
				submitting: false,
				error: false,
				success: false,

				user: {
					email: '',
					password: ''
				}
			}
		},
		methods: {
			...mapActions([
				'loginUser'
			]),

			handleSubmit() {
				const { email, password } = this.user
				const payload = {
					email,
					password
				}

				this.loginUser(payload)

				this.submitting = true
				this.clearStatus()

				if(this.invalidEmail || this.invalidPassword) {
					this.error = true
					return
				}
			},
			
			clearStatus () {
				this.success = false,
				this.error = false
			},
		},
		computed: {

			invalidEmail() {
				return this.user.email === ''
			},
			invalidPassword() {
				return this.user.password === ''
			}
		}
	}
</script>

<style scoped>
  form {
    margin-bottom: 2rem;
  }

  [class*='-message'] {
    font-weight: 500;
  }

  .error-message {
    color: #d33c40;
  }

  .success-message {
    color: #32a95d;
  }
</style>