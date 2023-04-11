class UpdateUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :description, :text
    add_column :users, :website, :string
    add_column :users, :website_name, :string
    add_column :users, :occupation, :string
    add_column :users, :hometown, :string
    add_column :users, :current_city, :string
    add_column :users, :country, :string
    add_column :users, :airport, :string
    add_column :users, :facebook, :string
    add_column :users, :twitter, :string
    add_column :users, :instagram, :string
    add_column :users, :pinterest, :string
    add_column :users, :tumblr, :string
  end
end
