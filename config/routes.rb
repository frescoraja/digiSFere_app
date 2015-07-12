Rails.application.routes.draw do
  root to: "site#main"
  get "/home", to: "site#home"
  namespace :api, defaults: { format: :json } do
    get "/listings/search", to: "listings#search"
    resources :listings, only: [:create, :index, :search, :show]
  end

  resources :users, only: [:create]
  resource :session, only: [:create, :destroy]
end
