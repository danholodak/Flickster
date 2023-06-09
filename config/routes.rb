Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update, :destroy, :index]
    resource :session, only: [:show, :create, :destroy]
    resources :photos, only: [:create, :show, :update, :destroy, :index]
    resources :comments, only: [:create, :update, :destroy]
    resources :testimonials, only: [:create, :update, :destroy]
    resources :favorites, only: [:create]
    resources :albums, only: [:create, :show, :update, :destroy]
    resources :album_entries, only: [:create]
    get 'albums/:user_id', to: 'albums#index'
    delete 'album_entries/', to: 'album_entries#destroy'
    delete 'favorites/', to: 'favorites#destroy'
    get 'comments/:photo_id', to: 'comments#index'
    get 'testimonials/:subject_id', to: 'testimonials#index'
  end

  get '*path', to: "static_pages#frontend_index"
end
