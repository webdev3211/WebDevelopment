#include<iostream>
#include<stdlib.h>
using namespace std;
int main()
{
    int t,n,k,left;
    cin>>t;
    int x=0;
    while(t--){
        cin>>n>>k;
        int *a = new int[n];
        left=0;
        for(int i=0;i<n;i++){
            cin>>a[i];
            a[i]=a[i]+left;
            if((a[i]-k)<0){
                x = i;
                cout<<"NO"<<" "<<i+1<<"\n";
                break;
            }
            left = a[i]-k;
        }
        if((a[x]-k)>0)
        {cout<<"YES"<<"\n";}
    }
}
